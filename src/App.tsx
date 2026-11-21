import { useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import './App.css'
import { AmbientParticles } from './components/AmbientParticles'
import { IntroScene } from './components/IntroScene'
import { LetterPaper } from './components/LetterPaper'
import { ClosingScene } from './components/ClosingScene'
import { MusicPlayer, type MusicPlayerHandle } from './components/MusicPlayer'

type ExperienceState = 'INITIAL' | 'OPENING' | 'READING' | 'ENDING' | 'REPLAY'

function App() {
  const [state, setState] = useState<ExperienceState>('INITIAL')
  const musicPlayerRef = useRef<MusicPlayerHandle>(null)

  const openLetter = () => {
    if (state !== 'INITIAL') return
    musicPlayerRef.current?.playFromGesture()
    setState('OPENING')
  }

  const finishOpening = () => {
    if (state !== 'OPENING') return
    setState('READING')
    window.scrollTo({ top: 0, behavior: 'auto' })
  }

  const replay = () => {
    setState('REPLAY')
    window.setTimeout(() => {
      setState('READING')
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }, 180)
  }

  const isIntro = state === 'INITIAL' || state === 'OPENING'

  return (
    <div className={`experience state-${state.toLowerCase()}`}>
      <AmbientParticles />
      <AnimatePresence mode="wait">
        {isIntro ? (
          <IntroScene
            key="intro"
            opening={state === 'OPENING'}
            onOpen={openLetter}
            onOpened={finishOpening}
          />
        ) : (
          <motion.main
            key="reading"
            className="reading-experience"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9 }}
          >
            <LetterPaper />
            <ClosingScene
              onReplay={replay}
              onVisible={() => setState((current) => current === 'READING' ? 'ENDING' : current)}
            />
          </motion.main>
        )}
      </AnimatePresence>
      <MusicPlayer ref={musicPlayerRef} />
    </div>
  )
}

export default App
