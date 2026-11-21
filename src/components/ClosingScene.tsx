import { Heart } from 'lucide-react'
import { motion } from 'framer-motion'
import { experienceConfig } from '../config'

export function ClosingScene({
  onReplay,
  onVisible,
}: {
  onReplay: () => void
  onVisible: () => void
}) {
  return (
    <section className="closing-scene" aria-label="Cierre de la carta">
      <motion.div
        className="closing-content"
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.7 }}
        onViewportEnter={onVisible}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      >
        <p>{experienceConfig.ending}</p>
        <div className="closing-heart" aria-hidden="true">
          <Heart fill="currentColor" strokeWidth={1} />
        </div>
        <button type="button" className="replay-button" onClick={onReplay}>
          {experienceConfig.replayLabel}
        </button>
      </motion.div>
    </section>
  )
}
