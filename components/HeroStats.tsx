'use client'

import React, { useState, useEffect } from 'react'

const HeroStats = () => {
  const [minutesAgo, setMinutesAgo] = useState(6)

  useEffect(() => {
    // Rastgele dakika değeri (2-15 arası)
    const randomMinutes = Math.floor(Math.random() * 14) + 2
    setMinutesAgo(randomMinutes)

    // Her dakika dakika sayısını güncelle (2-15 arası rastgele)
    const minutesInterval = setInterval(() => {
      const randomMinutes = Math.floor(Math.random() * 14) + 2
      setMinutesAgo(randomMinutes)
    }, 60000) // Her 1 dakikada bir

    return () => {
      clearInterval(minutesInterval)
    }
  }, [])

  return (
    <div className="mt-6 space-y-2">
      <p 
        style={{
          fontFamily: 'Roboto, "Roboto Fallback", ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
          fontSize: '16px',
          lineHeight: '24px',
          fontWeight: 400,
          color: '#1c1d16',
          textAlign: 'start',
          letterSpacing: 'normal',
          wordSpacing: '0px',
          fontStyle: 'normal',
          textTransform: 'none',
          textDecoration: 'none',
          textIndent: '0px'
        }}
      >
        Die letzte Anfrage wurde vor <span className="font-semibold">{minutesAgo}</span> Minuten gestellt
      </p>
    </div>
  )
}

export default React.memo(HeroStats)

