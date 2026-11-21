import { motion } from 'framer-motion'
import { experienceConfig } from '../config'
import { Envelope } from './Envelope'

export function IntroScene({
  opening,
  onOpen,
  onOpened,
}: {
  opening: boolean
  onOpen: () => void
  onOpened: () => void
}) {
  return (
    <motion.main
      className="intro-scene"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.025 }}
      transition={{ duration: 0.8 }}
    >
      <div className="intro-copy">
        <p className="intro-kicker">{experienceConfig.opening}</p>
        <h1>{experienceConfig.prompt}</h1>
      </div>

      <Envelope opening={opening} onOpen={onOpen} onOpened={onOpened} />

      <p className="intro-instruction">
        <span />
        {experienceConfig.instruction}
        <span />
      </p>
    </motion.main>
  )
}
