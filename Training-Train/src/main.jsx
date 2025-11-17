import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Login from './assets/Pages/login.jsx'
import Contacto from './assets/Pages/Contacto.jsx'
import Soporte from './assets/Pages/Soporte.jsx'
import NuestroTrabajo from './assets/Pages/NuestroTrabajo.jsx'
import Inicio from './assets/Pages/inicio.jsx'
import Actividades from './assets/Pages/Actividades.jsx'
import LoadingScreen from './assets/Pages/loadingScreen.jsx'
import Correcto from './assets/Pages/Correcto.jsx'
import Incorrecto from './assets/Pages/Incorrecto.jsx'
import Confirmacion from './assets/Pages/Confirmacion.jsx'
import NotFound from './assets/Pages/NotFound.jsx'
import Perfil from './assets/Pages/perfil.jsx'
import Progreso from './assets/Pages/progreso.jsx'
import Tienda from './assets/Pages/tienda.jsx'
import InfoActividad from './assets/Pages/infoActividad.jsx'
import Actividad from './assets/Pages/Actividad.jsx'
import Pregunta from './assets/Pages/Pregunta.jsx'
import SeguridadInformacion from './assets/Pages/Actividades.jsx'
import RiesgosDeltTrabajo from './assets/Pages/riesgosDeltTrabajo.jsx'
import Resultado from './assets/Pages/Resultado.jsx'
import ToastContainer from './components/ToastContainer.jsx'
import ThemeRoot from './components/ThemeRoot.jsx'
import Terminos from './assets/Pages/Terminos.jsx'

import { useAuthStore } from './store/authStore'

function ProtectedRoute({ children }) {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated)
  if (!isAuthenticated) return <Navigate to="/login" replace />
  return children
}

const basename = import.meta.env.PROD ? '/Training-Train/' : '/'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeRoot>
      <ToastContainer />
  <BrowserRouter basename={basename}>
        <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<Login />} />
  <Route path="/nuestro-trabajo" element={<NuestroTrabajo />} />
  <Route path="/contacto" element={<Contacto />} />
  <Route path="/soporte" element={<Soporte />} />
    <Route path="/inicio" element={<ProtectedRoute><Inicio /></ProtectedRoute>} />
  <Route path="/actividades" element={<ProtectedRoute><Actividades /></ProtectedRoute>} />
  {/* Alias explícito para seguridad de la información */}
  <Route path="/actividades/seguridad-informacion" element={<ProtectedRoute><SeguridadInformacion /></ProtectedRoute>} />
  {/* Nueva sección: Riesgos del Trabajo */}
  <Route path="/actividades/riesgos-delt-trabajo" element={<ProtectedRoute><RiesgosDeltTrabajo /></ProtectedRoute>} />
  {/* Nueva ruta genérica de preguntas por actividad */}
  <Route path="/actividades/:id/p/:qIndex" element={<ProtectedRoute><Pregunta /></ProtectedRoute>} />
  {/* Compatibilidad: redirigir rutas antiguas a la nueva entrada */}
  <Route path="/actividad/:id" element={<Navigate to="../actividades/:id/p/0" replace />} />
  <Route path="/actividad" element={<Navigate to="/actividades" replace />} />
    <Route path="/info-actividad" element={<ProtectedRoute><InfoActividad /></ProtectedRoute>} />
    <Route path="/info-actividad/:id" element={<ProtectedRoute><InfoActividad /></ProtectedRoute>} />
    <Route path="/perfil" element={<ProtectedRoute><Perfil /></ProtectedRoute>} />
    <Route path="/progreso" element={<ProtectedRoute><Progreso /></ProtectedRoute>} />
    <Route path="/tienda" element={<ProtectedRoute><Tienda /></ProtectedRoute>} />
    <Route path="/resultado" element={<ProtectedRoute><Resultado /></ProtectedRoute>} />
        <Route path="/loading" element={<LoadingScreen />} />
        <Route path="/correcto" element={<Correcto />} />
        <Route path="/incorrecto" element={<Incorrecto />} />
        <Route path="/confirmacion" element={<Confirmacion />} />
        <Route path="/terminos" element={<Terminos />} />
        <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </ThemeRoot>
  </StrictMode>,
)
