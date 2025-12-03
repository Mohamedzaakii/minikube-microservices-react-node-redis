import React, { useState } from 'react'

export default function App() {
  const [time, setTime] = useState(null)
  const fetchTime = async () => {
    try {
      const res = await fetch('/api/time')
      const j = await res.json()
      setTime(j)
    } catch (err) {
      setTime({ error: String(err) })
    }
  }
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', padding: 20 }}>
      <h1>Demo: React + Node + Redis on Minikube</h1>
      <button onClick={fetchTime}>Get Time from Backend</button>
      <pre style={{ background: '#f4f4f4', padding: 10 }}>{JSON.stringify(time, null, 2)}</pre>
    </div>
  )
}
