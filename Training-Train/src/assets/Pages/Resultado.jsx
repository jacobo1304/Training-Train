import { useNavigate } from 'react-router-dom'
import AppLayout from '../../components/AppLayout'
import { useActivityStore } from '../../store/activityStore'

export default function Resultado() {
	const navigate = useNavigate()
	const score = useActivityStore((s) => (typeof s.lastScore === 'number' ? s.lastScore : 86))
	const reward = useActivityStore((s) => (typeof s.lastReward === 'number' ? s.lastReward : 8))

	const progress = Math.max(0, Math.min(100, score))

		return (
			<AppLayout footerCurrent="home">
				<main className="relative min-h-dvh pb-8 bg-zinc-50 text-zinc-900 dark:bg-zinc-900 dark:text-zinc-100 transition-colors">
			{/* Confetti */}
			<img
				src="/images/Confetti.png"
				alt="Confetti"
				className="pointer-events-none absolute inset-0 z-0 h-full w-full object-cover opacity-90"
				onError={(e) => {
					e.currentTarget.style.display = 'none'
				}}
			/>

			<div className="relative z-10 mx-auto flex max-w-screen-sm flex-col items-center gap-8 px-4 pt-10 text-center">
			<h1 className="text-4xl font-extrabold text-sky-700 dark:text-sky-300">Bien hecho!</h1>

				{/* Tren */}
				<img
					src="/images/Training Train Proyecto DCU. (3).png"
					alt="Training train"
					className="w-60 md:w-72 h-auto drop-shadow"
					onError={(e) => {
						// Oculta la imagen si falla la carga; evita usar /vite.svg
						e.currentTarget.style.display = 'none'
					}}
				/>

				{/* Barra de progreso */}
				<div className="w-full max-w-md">
								<div className="relative h-3 w-full overflow-hidden rounded-full border border-amber-500/70 bg-zinc-200 dark:bg-zinc-800/70">
						<div
							className="h-full rounded-full bg-gradient-to-r from-sky-400 via-amber-400 to-amber-500"
							style={{ width: `${progress}%` }}
						/>
						<span className="absolute right-3 top-1/2 -translate-y-1/2 text-amber-400">🚄</span>
					</div>
				</div>

				{/* Mensajes */}
				<div className="mt-2 space-y-4">
								<p className="text-3xl font-extrabold">
									Tuviste un puntaje de <span className="text-4xl">{progress}%</span>
								</p>
								<p className="text-2xl text-zinc-700 dark:text-zinc-200">Ganaste {reward} monedas de recompensa.</p>
				</div>

				{/* Botones */}
				<div className="mt-2 flex w-full max-w-md items-center justify-center gap-4">
								<button
						type="button"
									className="flex-1 rounded-xl border px-6 py-3 shadow focus:outline-none focus:ring-2 focus:ring-amber-400 border-amber-600/60 text-amber-700 hover:bg-amber-200/20 dark:border-amber-500/60 dark:text-amber-300 dark:hover:bg-amber-500/10"
						onClick={() => navigate('/inicio')}
					>
						Inicio
					</button>
					<button
						type="button"
						className="flex-1 rounded-xl bg-sky-700 px-6 py-3 text-white shadow hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-sky-400"
						onClick={() => navigate('/actividades')}
					>
						Siguiente actividad
					</button>
				</div>
			</div>

			</main>
			</AppLayout>
	)
}
