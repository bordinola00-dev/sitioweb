import { memo } from 'react'

const particles = Array.from({ length: 26 }, (_, index) => ({
  id: index,
  left: (index * 37 + 11) % 100,
  top: (index * 53 + 7) % 100,
  size: 2 + (index % 3),
  delay: (index % 9) * -0.8,
  duration: 10 + (index % 7),
}))

export const AmbientParticles = memo(function AmbientParticles() {
  return (
    <div className="ambient" aria-hidden="true">
      {particles.map((particle) => (
        <span
          key={particle.id}
          className={particle.id % 7 === 0 ? 'particle particle-star' : 'particle'}
          style={
            {
              left: `${particle.left}%`,
              top: `${particle.top}%`,
              width: particle.size,
              height: particle.size,
              animationDelay: `${particle.delay}s`,
              animationDuration: `${particle.duration}s`,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  )
})
