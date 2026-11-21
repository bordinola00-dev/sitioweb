import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react'
import { Pause, Play, Volume2 } from 'lucide-react'
import { experienceConfig } from '../config'

type PlaybackState = 'loading' | 'playing' | 'paused' | 'blocked' | 'error' | 'ended'

export type MusicPlayerHandle = {
  playFromGesture: () => void
}

export const MusicPlayer = forwardRef<MusicPlayerHandle>(function MusicPlayer(_props, ref) {
  const audioRef = useRef<HTMLAudioElement>(null)
  const hasStartedRef = useRef(false)
  const [playbackState, setPlaybackState] = useState<PlaybackState>('paused')
  const [volume, setVolume] = useState(0.45)
  const [hasAttemptedPlayback, setHasAttemptedPlayback] = useState(false)
  const { audioUrl, startAtSeconds, title, artist } = experienceConfig.music

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume
  }, [volume])

  const play = useCallback(() => {
    const audio = audioRef.current
    if (!audio) return

    setHasAttemptedPlayback(true)
    setPlaybackState('loading')

    if (!hasStartedRef.current) {
      hasStartedRef.current = true
      const seekToStart = () => {
        if (!Number.isFinite(audio.duration) || audio.duration <= startAtSeconds) {
          audio.pause()
          setPlaybackState('error')
          return
        }
        audio.currentTime = startAtSeconds
      }

      if (audio.readyState >= HTMLMediaElement.HAVE_METADATA) {
        if (!Number.isFinite(audio.duration) || audio.duration <= startAtSeconds) {
          setPlaybackState('error')
          return
        }
        audio.currentTime = startAtSeconds
      } else {
        audio.addEventListener('loadedmetadata', seekToStart, { once: true })
      }
    }

    void audio.play().catch((error: unknown) => {
      setPlaybackState(
        error instanceof DOMException && error.name === 'NotAllowedError' ? 'blocked' : 'error',
      )
    })
  }, [startAtSeconds])

  useImperativeHandle(ref, () => ({ playFromGesture: play }), [play])

  const toggle = () => {
    const audio = audioRef.current
    if (!audio) return

    if (playbackState === 'loading') return
    if (audio.paused) play()
    else audio.pause()
  }

  const playing = playbackState === 'playing'
  const notice = hasAttemptedPlayback
    && (playbackState === 'blocked' || playbackState === 'error' || playbackState === 'ended')

  return (
    <aside className="music-player" aria-label="Reproductor de música">
      <audio
        ref={audioRef}
        src={audioUrl}
        preload="auto"
        onPlay={() => setPlaybackState('playing')}
        onPause={() => setPlaybackState('paused')}
        onEnded={() => {
          hasStartedRef.current = false
          setPlaybackState('ended')
        }}
        onError={() => setPlaybackState('error')}
      />
      <button
        type="button"
        className="music-toggle"
        onClick={toggle}
        aria-label={playing ? `Pausar ${title}` : `Reproducir ${title}`}
        aria-pressed={playing}
      >
        {playing ? <Pause size={14} fill="currentColor" /> : <Play size={14} fill="currentColor" />}
      </button>
      <div className="music-meta">
        <span className="music-title">{title}</span>
        <span className="music-artist">{artist}</span>
      </div>
      <span className={`music-bars ${playing ? 'is-playing' : ''}`} aria-hidden="true">
        <i /><i /><i />
      </span>
      <label className="volume-control" aria-label="Volumen">
        <Volume2 size={13} aria-hidden="true" />
        <input
          type="range"
          min="0"
          max="1"
          step="0.05"
          value={volume}
          onChange={(event) => setVolume(Number(event.target.value))}
        />
      </label>
      {notice && (
        <span className="music-notice" role="status">
          {playbackState === 'blocked'
            ? 'El navegador bloqueó el audio. Vuelve a pulsar reproducir.'
            : playbackState === 'ended'
              ? 'Vista previa terminada. Abre la canción completa.'
              : 'No se pudo reproducir. Abre la canción en Apple Music.'}
        </span>
      )}
    </aside>
  )
})
