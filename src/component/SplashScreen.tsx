import { useEffect, useState } from 'react'

interface Props { onComplete: () => void }

export default function SplashScreen({ onComplete }: Props) {
  const [phase, setPhase] = useState<'in' | 'wait' | 'exit'>('in')

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('wait'), 400)
    const t2 = setTimeout(() => setPhase('exit'), 2600)
    const t3 = setTimeout(() => onComplete(), 3800)
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3) }
  }, [onComplete])

  return (
    <div className={`splash${phase === 'exit' ? ' exit' : ''}`}>
      <div className="splash-bar-left" />
      <div className="splash-bar-right" />
      <div className="splash-j">J</div>
      <div className="splash-accent" />
      <div className="splash-label">Jamyle · Fotografia</div>
    </div>
  )
}
