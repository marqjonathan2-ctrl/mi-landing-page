import { useState, useEffect } from 'react'

export default function useCountUp(target: number, duration = 1) {
  const [value, setValue] = useState(0)
  useEffect(() => {
    if (duration <= 0) { setValue(target); return }
    let start = performance.now()
    const step = (now: number) => {
      const t = Math.min((now - start) / (duration * 1000), 1)
      setValue(target * t)
      if (t < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [target, duration])
  return value
}