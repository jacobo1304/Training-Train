import LandingHeader from '../../components/LandingHeader'
import { publicImages } from '../../assets/images'
import { Link } from 'react-router-dom'
import { useEffect, useRef } from 'react'

export default function LandingPage() {
  // Refs para animaciones de fade-in al hacer scroll
  const fadeRefs = useRef([])

  useEffect(() => {
    const els = fadeRefs.current
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('is-visible')
            observer.unobserve(e.target)
          }
        })
      },
      { threshold: 0.15 }
    )
    els.forEach((el) => el && observer.observe(el))
    return () => observer.disconnect()
  }, [])
  return (
    <div className="min-h-screen bg-[#0F172A] text-white">
  <LandingHeader useRoutes />

      {/* Empujar contenido debajo del header */}
  <main id="top" className="pt-14">
        {/* Hero */}
        <section
          className="mx-auto max-w-6xl px-4 sm:px-6"
          style={{ '--heroH': 'clamp(84px, 10vw + 28px, 200px)' }}
        >
          <div className="grid gap-8 py-10 sm:grid-cols-2 sm:items-center">
            <div>
              {/* Bloque amarillo con título y subtítulo sincronizados a --heroH */}
              <div className="flex min-h-[var(--heroH)] max-w-md items-center justify-center rounded-md bg-amber-400 px-4 py-3 text-zinc-900">
                <div>
                  <h1 className="font-bold leading-tight [font-size:clamp(1.5rem,calc(var(--heroH)/2.4),2.5rem)]">Training train</h1>
                  <p className="mt-1 italic text-left text-zinc-800 [font-size:clamp(.85rem,calc(var(--heroH)/9),1rem)]">#Be prepared · Feel prepared</p>
                </div>
              </div>
              <p className="mt-6 text-left text-base text-white/90">Tu entrenamiento comienza aquí. Capacita a tu equipo con experiencias interactivas que mejoran la retención y previenen riesgos.</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a href="#programa" className="rounded bg-amber-400 px-4 py-2 font-medium text-black hover:bg-amber-300">Conoce nuestro programa</a>
                <Link to="/login" className="rounded border border-white/30 px-4 py-2 hover:bg-white/10">Ingresar</Link>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <img
                src={publicImages.interactividad}
                alt="Interactividad"
                className="h-[var(--heroH)] w-auto rounded-md object-contain sm:max-h-64 transform scale-[1.15]"
              />
            </div>
          </div>
        </section>

        {/* Separador visual */}
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="h-px w-full bg-white/20" />
        </div>

        {/* Sección 1 */}
        <section
          id="programa"
          ref={(el) => (fadeRefs.current[0] = el)}
          className="fade-in-section mx-auto max-w-6xl px-4 py-10 sm:px-6"
        >
          <div className="grid gap-6 sm:grid-cols-[1.2fr_1fr] sm:items-center">
            <div>
              <h2 className="text-xl font-semibold text-amber-300">Formación efectiva para empleados</h2>
              <p className="mt-3 text-left text-sm leading-relaxed text-white/90">Training train es una plataforma de cursos interactivos para empresas que buscan capacitar a sus empleados de forma efectiva, con contenidos prácticos y medibles.</p>
            </div>
            <div className="flex items-center justify-center">
              <img src={publicImages.landing1} alt="Conoce nuestra ruta" className="max-h-40 w-auto rounded-md object-cover" />
            </div>
          </div>
        </section>

        {/* Sección 2 */}
        <section
          id="nuestro-trabajo"
          ref={(el) => (fadeRefs.current[1] = el)}
          className="fade-in-section mx-auto max-w-6xl px-4 py-10 sm:px-6"
        >
          <div className="grid gap-6 sm:grid-cols-[1fr_1.2fr] sm:items-center">
            <div className="order-2 sm:order-1">
              <img src={publicImages.landing2} alt="Formas de aprender" className="max-h-40 w-auto rounded-md object-cover" />
            </div>
            <div className="order-1 sm:order-2">
              <h2 className="text-xl font-semibold text-amber-300">Formas fáciles de aprender</h2>
              <p className="mt-3 text-left text-sm leading-relaxed text-white/90">Con nuestro sistema game-based, tus empleados podrán recibir recompensas y mantener la motivación al acabar los cursos.</p>
            </div>
          </div>
        </section>

        {/* Sección 3 */}
        <section
          id="soporte"
          ref={(el) => (fadeRefs.current[2] = el)}
          className="fade-in-section mx-auto max-w-6xl px-4 py-10 sm:px-6"
        >
          <div className="grid gap-6 sm:grid-cols-[1.2fr_1fr] sm:items-center">
            <div>
              <h2 className="text-xl font-semibold text-amber-300">Un equipo especializado en ayudar</h2>
              <p className="mt-3 text-left text-sm leading-relaxed text-white/90">Contamos con soporte de primera calidad, diseñadores de actividades expertos y seguimiento constante de resultados para darte la mejor experiencia.</p>
            </div>
            <div className="flex items-center justify-center">
              <img src={publicImages.customerLoyalty} alt="Soporte" className="max-h-40 w-auto rounded-md object-cover" />
            </div>
          </div>
        </section>

        {/* Contacto */}
        <section
          id="contacto"
          ref={(el) => (fadeRefs.current[3] = el)}
          className="fade-in-section mx-auto max-w-6xl px-4 py-10 sm:px-6"
        >
          <div className="grid gap-6 sm:grid-cols-2 sm:items-center">
            <div>
              <h2 className="text-xl font-semibold text-amber-300">Contacto</h2>
              <p className="mt-3 text-left text-sm leading-relaxed text-white/90">¿Tienes preguntas? Nuestro equipo está listo para ayudarte a implementar Training train en tu organización.</p>
            </div>
            <div className="flex flex-col gap-2 text-sm">
              <a href="mailto:soporte@trainingtrain.co" className="hover:underline underline-offset-4">soporte@trainingtrain.co</a>
              <a href="#top" className="hover:underline underline-offset-4">Volver arriba</a>
            </div>
          </div>
        </section>

        {/* CTA grande */}
        <section
          ref={(el) => (fadeRefs.current[4] = el)}
          className="fade-in-section mx-auto max-w-6xl px-4 pb-12 sm:px-6"
        >
          <div className="rounded-md bg-amber-400 p-6 text-black">
            <h3 className="text-xl font-semibold">¿Qué esperas para unirte?</h3>
            <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div className="rounded-md bg-black/5 p-6">
                <p className="mb-4 font-medium text-left">Si eres empleador</p>
                <Link to="/contacto" className="rounded bg-[#163477] px-4 py-2 text-white hover:bg-[#1d4295]">Cotizar</Link>
              </div>
              <div className="rounded-md bg-black/5 p-6">
                <p className="mb-4 font-medium text-left">Si eres empleado</p>
                <Link to="/login" className="rounded bg-[#163477] px-4 py-2 text-white hover:bg-[#1d4295]">Ingresar</Link>
              </div>
            </div>
          </div>
        </section>

        {/* Footer mini */}
        <footer className="mx-auto max-w-6xl px-4 pb-10 text-xs text-white/70 sm:px-6">
          <div className="h-px w-full bg-white/20" />
          <div className="mt-4 flex items-center justify-between">
            <a href="#top" className="hover:underline underline-offset-4">Volver arriba</a>
            <span>Contacto: soporte@trainingtrain.co</span>
          </div>
        </footer>
      </main>
    </div>
  )
}
