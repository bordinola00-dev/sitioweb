import { motion } from 'framer-motion'
import { experienceConfig } from '../config'
import { letterParagraphs } from '../content/letter'

export function LetterContent() {
  return (
    <article className="letter-content" aria-label="Carta escrita">
      <header className="letter-header">
        <div className="tiny-ornament" aria-hidden="true">
          <span />
          <i />
          <span />
        </div>
        <h2>{experienceConfig.title}</h2>
      </header>

      <div className="letter-body">
        {letterParagraphs.map((paragraph, index) => (
          <motion.p
            key={`${index}-${paragraph.slice(0, 18)}`}
            initial={{ opacity: 0.2, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.45 }}
            transition={{ duration: 0.75, delay: 0.04, ease: [0.16, 1, 0.3, 1] }}
            className={index === 0 ? 'letter-greeting' : undefined}
          >
            {paragraph}
          </motion.p>
        ))}
      </div>

      <footer className="letter-signature">
        <span>{experienceConfig.closing}</span>
        <i aria-hidden="true">♡</i>
      </footer>
    </article>
  )
}
