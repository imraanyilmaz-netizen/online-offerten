'use client'

import React, { useState, useEffect } from 'react'

const HeroStats = () => {
  const [minutesAgo, setMinutesAgo] = useState(6)
  const [todayCount, setTodayCount] = useState(50)

  useEffect(() => {
    // Rastgele dakika değeri (2-15 arası)
    const randomMinutes = Math.floor(Math.random() * 14) + 2
    setMinutesAgo(randomMinutes)

    // Saat başına 10 ekleme mantığı
    const calculateTodayCount = () => {
      const now = new Date()
      const currentHour = now.getHours()
      
      // Sabah 12'den (12:00) başla, akşam 12'ye (23:59) kadar
      // Saat 12'de başlangıç: 50
      // Her saat başına +10
      let startHour = 12
      let baseCount = 50
      
      if (currentHour >= 12) {
        // Öğleden sonra: 12'den itibaren geçen saatler
        const hoursPassed = currentHour - startHour
        const count = baseCount + (hoursPassed * 10)
        setTodayCount(count)
      } else {
        // Gece yarısından sabah 12'ye kadar: önceki günün devamı
        // Gece 0-11 arası için: 12 saat * 10 = 120 ekle
        const hoursPassed = currentHour + (24 - startHour)
        const count = baseCount + (hoursPassed * 10)
        setTodayCount(count)
      }
    }

    calculateTodayCount()

    // Her dakika dakika sayısını güncelle (2-15 arası rastgele)
    const minutesInterval = setInterval(() => {
      const randomMinutes = Math.floor(Math.random() * 14) + 2
      setMinutesAgo(randomMinutes)
    }, 60000) // Her 1 dakikada bir

    // Her saat başı sayıyı güncelle
    const hourInterval = setInterval(() => {
      calculateTodayCount()
    }, 3600000) // Her 1 saatte bir

    return () => {
      clearInterval(minutesInterval)
      clearInterval(hourInterval)
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
        Es wurden heute <span className="font-bold text-green-600">{todayCount}</span>{' '}
        <span className="font-bold text-green-600">Anfragen</span> gestellt
      </p>
    </div>
  )
}

export default HeroStats

