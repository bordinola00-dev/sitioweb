import { LetterContent } from './LetterContent'

export function LetterPaper() {
  return (
    <div className="reading-shell">
      <div className="letter-paper">
        <div className="paper-edge paper-edge-left" aria-hidden="true" />
        <div className="paper-edge paper-edge-right" aria-hidden="true" />
        <LetterContent />
      </div>
    </div>
  )
}
