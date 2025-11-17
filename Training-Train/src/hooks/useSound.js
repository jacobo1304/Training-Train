export default function useSound(options = {}) {
  const base = (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.BASE_URL) || '/'
  const resolveCandidates = (rel) => {
    const primary = options.baseUrl ? `${options.baseUrl}${rel}` : `${base}${rel}`
    const alt = `/${rel}`
    const alt2 = base === '/' ? `/Training-Train/${rel}` : `/${rel}`
    const set = new Set([primary, alt, alt2])
    return Array.from(set)
  }

  const successCandidates = options.successUrl ? [options.successUrl] : resolveCandidates('audio/correct.mp3')
  const errorCandidates = options.errorUrl ? [options.errorUrl] : resolveCandidates('audio/incorrect.mp3')

  const createAudioWithFallback = (urls, volume) => {
    if (!urls || !urls.length) return null
    const audio = new Audio()
    audio.preload = 'auto'
    audio.volume = volume
    let idx = 0
    const tryNext = () => {
      if (idx >= urls.length) return
      audio.src = urls[idx++]
      // Intento de precarga suave
      audio.load()
    }
    tryNext()
    // Si falla al reproducir, probar siguiente ruta
    const playWithFallback = () => {
      try {
        audio.currentTime = 0
        const p = audio.play()
        if (p && typeof p.catch === 'function') {
          return p.catch(() => {
            tryNext()
            return audio.play().catch(() => {})
          })
        }
      } catch {
        tryNext()
        try { audio.play() } catch {}
      }
    }
    return { audio, playWithFallback }
  }

  const successObj = createAudioWithFallback(successCandidates, options.successVolume ?? 0.7)
  const errorObj = createAudioWithFallback(errorCandidates, options.errorVolume ?? 0.7)

  return {
    playSuccess: () => successObj && successObj.playWithFallback && successObj.playWithFallback(),
    playError: () => errorObj && errorObj.playWithFallback && errorObj.playWithFallback(),
  }
}
