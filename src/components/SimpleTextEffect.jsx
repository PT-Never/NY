import React, { useEffect, useState } from 'react'

const loveQuotes = [
  "Cảm ơn vì em đã đến",
  "Anh sẽ luôn bên cạnh em",
  "Mãi mãi bên em ♥",
  "Em là thiên thần của anh",
  "Anh yêu em"
]

const colors = ['#ff69b4', '#ff1493', '#ff6347', '#ff4500', '#ff8c00', '#ffd700', '#ffb6c1', '#ffc0cb', '#ffffff']

export function SimpleTextEffect() {
  const [texts, setTexts] = useState([])

  useEffect(() => {
    const createText = () => {
      const newText = {
        id: Math.random(),
        content: loveQuotes[Math.floor(Math.random() * loveQuotes.length)],
        x: Math.random() * (window.innerWidth - 300) + 150,
        y: -50,
        speed: 0.8 + Math.random() * 0.6,
        opacity: 0.85 + Math.random() * 0.15,
        size: 16 + Math.random() * 10,
        color: colors[Math.floor(Math.random() * colors.length)],
        drift: (Math.random() - 0.5) * 0.3
      }
      
      // Tăng lên 30 texts cùng lúc
      setTexts(prev => [...prev.slice(-30), newText])
    }

    const animate = () => {
      setTexts(prev => prev
        .map(text => ({
          ...text,
          y: text.y + text.speed,
          x: text.x + text.drift,
          opacity: text.y > window.innerHeight - 200 ? text.opacity - 0.015 : text.opacity
        }))
        .filter(text => text.y < window.innerHeight + 100 && text.opacity > 0.1)
      )
    }

    // Tạo text ngay lập tức (burst effect)
    for(let i = 0; i < 8; i++) {
      setTimeout(createText, i * 200)
    }

    // Tạo text liên tục mỗi 400ms
    const textInterval = setInterval(createText, 400)
    const animationFrame = setInterval(animate, 16)

    return () => {
      clearInterval(textInterval)
      clearInterval(animationFrame)
    }
  }, [])

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', pointerEvents: 'none', zIndex: 1 }}>
      {texts.map(text => (
        <div
          key={text.id}
          style={{
            position: 'absolute',
            left: `${text.x}px`,
            top: `${text.y}px`,
            fontSize: `${text.size}px`,
            opacity: text.opacity,
            color: text.color,
            fontWeight: 'bold',
            textShadow: `
              0 0 8px ${text.color}, 
              0 0 16px ${text.color}, 
              0 0 24px ${text.color}
            `,
            fontFamily: 'Arial, sans-serif',
            whiteSpace: 'nowrap',
            transform: 'translateX(-50%)',
            filter: `brightness(${1 + Math.random() * 0.3})`,
            animation: `textFloat ${2 + Math.random()}s ease-in-out infinite alternate`
          }}
        >
          {text.content}
        </div>
      ))}
      
    </div>
  )
}