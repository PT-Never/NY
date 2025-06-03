import React, { useEffect, useState } from 'react'

const heartTypes = ['♥', '💖', '💕', '💗', '❤️']

export function HeartsEffect() {
  const [hearts, setHearts] = useState([])

  useEffect(() => {
    const createHeart = () => {
      const newHeart = {
        id: Math.random(),
        x: Math.random() * window.innerWidth,
        y: -30,
        speed: 0.8 + Math.random() * 0.7,
        size: 14 + Math.random() * 12,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 3,
        heart: heartTypes[Math.floor(Math.random() * heartTypes.length)],
        drift: (Math.random() - 0.5) * 0.4,
        glowIntensity: 0.5 + Math.random() * 0.5
      }
      
      // Tăng lên 25 hearts cùng lúc
      setHearts(prev => [...prev.slice(-25), newHeart])
    }

    const animate = () => {
      setHearts(prev => prev
        .map(heart => ({
          ...heart,
          y: heart.y + heart.speed,
          x: heart.x + heart.drift,
          rotation: heart.rotation + heart.rotationSpeed
        }))
        .filter(heart => heart.y < window.innerHeight + 50)
      )
    }

    // Tạo hearts ngay lập tức (burst effect)
    for(let i = 0; i < 6; i++) {
      setTimeout(createHeart, i * 150)
    }

    // Tạo hearts liên tục mỗi 300ms
    const heartInterval = setInterval(createHeart, 300)
    const animationFrame = setInterval(animate, 16)

    return () => {
      clearInterval(heartInterval)
      clearInterval(animationFrame)
    }
  }, [])

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', pointerEvents: 'none', zIndex: 2 }}>
      {hearts.map(heart => (
        <div
          key={heart.id}
          style={{
            position: 'absolute',
            left: `${heart.x}px`,
            top: `${heart.y}px`,
            fontSize: `${heart.size}px`,
            transform: `translateX(-50%) rotate(${heart.rotation}deg)`,
            color: '#ff4757',
            textShadow: `
              0 0 ${6 * heart.glowIntensity}px #ff4757, 
              0 0 ${12 * heart.glowIntensity}px #ff4757,
              0 0 ${18 * heart.glowIntensity}px #ff1493
            `,
            filter: `brightness(${1 + heart.glowIntensity * 0.2})`,
            animation: `heartPulse ${1.5 + Math.random()}s ease-in-out infinite alternate`
          }}
        >
          {heart.heart}
        </div>
      ))}
      
      <style jsx>{`
        @keyframes heartPulse {
          0% { 
            transform: translateX(-50%) scale(1);
            filter: brightness(1);
          }
          100% { 
            transform: translateX(-50%) scale(1.15);
            filter: brightness(1.3);
          }
        }
      `}</style>
    </div>
  )
}