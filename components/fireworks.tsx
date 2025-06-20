"use client"

import { useEffect, useState } from "react"

interface FireworksProps {
  show: boolean
  onComplete?: () => void
}

export function Fireworks({ show, onComplete }: FireworksProps) {
  const [particles, setParticles] = useState<
    Array<{
      id: number
      x: number
      y: number
      vx: number
      vy: number
      color: string
      life: number
    }>
  >([])

  useEffect(() => {
    if (!show) return

    const colors = ["#FFD700", "#FF6B6B", "#4ECDC4", "#45B7D1", "#96CEB4", "#FFEAA7"]
    const newParticles = []

    // Create multiple bursts
    for (let burst = 0; burst < 3; burst++) {
      const centerX = Math.random() * window.innerWidth
      const centerY = Math.random() * (window.innerHeight / 2) + 100

      for (let i = 0; i < 20; i++) {
        const angle = (Math.PI * 2 * i) / 20
        const velocity = Math.random() * 5 + 3

        newParticles.push({
          id: burst * 20 + i,
          x: centerX,
          y: centerY,
          vx: Math.cos(angle) * velocity,
          vy: Math.sin(angle) * velocity,
          color: colors[Math.floor(Math.random() * colors.length)],
          life: 1,
        })
      }
    }

    setParticles(newParticles)

    const interval = setInterval(() => {
      setParticles((prev) =>
        prev
          .map((particle) => ({
            ...particle,
            x: particle.x + particle.vx,
            y: particle.y + particle.vy,
            vy: particle.vy + 0.1, // gravity
            life: particle.life - 0.02,
          }))
          .filter((particle) => particle.life > 0),
      )
    }, 16)

    const timeout = setTimeout(() => {
      setParticles([])
      onComplete?.()
    }, 3000)

    return () => {
      clearInterval(interval)
      clearTimeout(timeout)
    }
  }, [show, onComplete])

  if (!show || particles.length === 0) return null

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute w-2 h-2 rounded-full"
          style={{
            left: particle.x,
            top: particle.y,
            backgroundColor: particle.color,
            opacity: particle.life,
            transform: `scale(${particle.life})`,
          }}
        />
      ))}
    </div>
  )
}
