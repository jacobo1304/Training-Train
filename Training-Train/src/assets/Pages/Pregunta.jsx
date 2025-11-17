import { useMemo, useState, useEffect } from 'react'
import { useNavigate, useParams, Navigate } from 'react-router-dom'
import AppLayout from '../../components/AppLayout'
import ConfirmDialog from '../components/ConfirmDialog'
import { useUIStore } from '../../store/uiStore'
import { getActivityById } from '../../data/activities'
import QuestionRenderer from '../../components/QuestionRenderer'
import { useActivityStore } from '../../store/activityStore'

export default function Pregunta() {
  const { id: activityId, qIndex } = useParams()
  const navigate = useNavigate()
  const [openConfirm, setOpenConfirm] = useState(false)
  const [seleccion, setSeleccion] = useState(null)
  const showToast = useUIStore((s) => s.showToast)
  const startActivity = useActivityStore((s) => s.startActivity)
  const selectOption = useActivityStore((s) => s.selectOption)
  const next = useActivityStore((s) => s.next)
  const finishActivity = useActivityStore((s) => s.finishActivity)
  const resetActivity = useActivityStore((s) => s.resetActivity)

  const idx = Number(qIndex)
  const activity = useMemo(() => getActivityById(activityId), [activityId])

  useEffect(() => {
    if (activity) {
      // Reinicia el progreso al comenzar la actividad (primera pregunta)
      if (idx === 0) resetActivity(activity.id)
      startActivity(activity.id)
    }
  }, [activity, startActivity, resetActivity, idx])

  if (!activity || Number.isNaN(idx) || idx < 0 || idx >= activity.questions.length) {
    return <Navigate to="/actividades" replace />
  }

  const question = activity.questions[idx]

  const handleSelect = (op) => {
    setSeleccion(op.id)
    const correct = !!op.correct

    selectOption(activity.id, { questionId: question.id, optionId: op.id, correct })

    if (correct) {
      showToast({ type: 'activity-success', imageKey: 'toastSuccess' })
    } else {
      showToast({ type: 'error', message: question.explanation || 'Respuesta incorrecta' })
    }

    // Navegar siguiente o a resultado
    const total = activity.questions.length
    const nextIndex = idx + 1

    setTimeout(() => {
      if (nextIndex < total) {
        next(activity.id, total)
        navigate(`/actividades/${activity.id}/p/${nextIndex}`)
      } else {
        // Calcular score por última respuesta de cada pregunta (sin duplicados)
        const answers = useActivityStore.getState().progressByActivity[activity.id]?.answers || []
        const lastByQuestion = new Map()
        for (const a of answers) {
          lastByQuestion.set(a.questionId, a)
        }
        const rights = Array.from(lastByQuestion.values()).filter((a) => a.correct).length
        const score = Math.max(0, Math.min(100, Math.round((rights / total) * 100)))
        const reward = rights * 4
        finishActivity({ score, reward })
        navigate('/resultado')
      }
    }, correct ? 800 : 300)
  }

  return (
    <AppLayout footerCurrent="home" showBackHeader={true} backTitle={activity.title}>
      <main className="min-h-dvh pb-8 bg-zinc-50 text-zinc-900 dark:bg-zinc-900 dark:text-zinc-100 transition-colors">
        {/* Imagen principal */}
        <div className="mx-auto max-w-screen-sm">
          <div className="relative">
            <div className="h-64 w-full bg-zinc-200 dark:bg-zinc-800">
              {question.image && (
                <img src={question.image} alt={question.text} className="h-64 w-full object-cover" />
              )}
            </div>
          </div>

          {/* Enunciado */}
          <div className="px-4 py-4">
            <p className="text-base md:text-lg text-zinc-700 dark:text-zinc-200">{question.text}</p>
            <h2 className="mt-3 text-xl font-bold text-sky-700 dark:text-sky-300">Selecciona una opción</h2>
          </div>

          {/* Opciones */}
          <div className="px-4 pb-4">
            <QuestionRenderer question={question} selectedId={seleccion} onSelect={handleSelect} />
          </div>
        </div>

        {/* Confirmación para abandonar actividad */}
        <ConfirmDialog
          open={openConfirm}
          onCancel={() => setOpenConfirm(false)}
          onConfirm={() => navigate(-1)}
          title="¿Abandonar actividad?"
          message="Si abandonas ahora, podrías perder tu progreso."
          confirmText="Sí"
          cancelText="No"
        />
      </main>
    </AppLayout>
  )
}
