import { WaxSeal } from './WaxSeal'

export function Envelope({
  opening,
  onOpen,
  onOpened,
}: {
  opening: boolean
  onOpen: () => void
  onOpened: () => void
}) {
  return (
    <button
      type="button"
      className={`envelope-button ${opening ? 'is-opening' : ''}`}
      onClick={onOpen}
      onAnimationEnd={(event) => {
        if (event.target === event.currentTarget && event.animationName === 'envelope-open-camera') {
          onOpened()
        }
      }}
      disabled={opening}
      aria-label="Abrir la carta especial"
    >
      <span className="envelope">
        <span className="envelope-back" />
        <span className="letter-sheet">
          <span className="sheet-corner" />
        </span>
        <span className="envelope-front" />
        <span className="envelope-flap">
          <span className="flap-line" />
        </span>
        <WaxSeal />
      </span>
    </button>
  )
}
