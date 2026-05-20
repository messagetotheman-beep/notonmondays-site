import { useState, useEffect, useRef } from 'react'

const DURATIONS = [
  { seconds: 5 * 60,  label: 'Just start' },
  { seconds: 15 * 60, label: '15 min' },
  { seconds: 25 * 60, label: '25 min' },
]

const DEFAULT_DURATION = 25 * 60

function formatTime(seconds) {
  const m = Math.floor(seconds / 60).toString().padStart(2, '0')
  const s = (seconds % 60).toString().padStart(2, '0')
  return `${m}:${s}`
}

export default function PomodoroTimer() {
  const [duration, setDuration] = useState(DEFAULT_DURATION)
  const [seconds, setSeconds] = useState(DEFAULT_DURATION)
  const [running, setRunning] = useState(false)
  const intervalRef = useRef(null)

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => {
        setSeconds(s => {
          if (s <= 1) {
            clearInterval(intervalRef.current)
            setRunning(false)
            return 0
          }
          return s - 1
        })
      }, 1000)
    } else {
      clearInterval(intervalRef.current)
    }
    return () => clearInterval(intervalRef.current)
  }, [running])

  function handleDurationChange(d) {
    setRunning(false)
    setDuration(d)
    setSeconds(d)
  }

  function reset() {
    setRunning(false)
    setSeconds(duration)
  }

  const atStart = seconds === duration
  const label = running ? 'Pause' : atStart ? 'Start' : 'Resume'
  const progress = ((duration - seconds) / duration) * 100

  return (
    <div className="card timer-card">
      <span className="section-label">Focus timer</span>

      <div className="dur-selector">
        {DURATIONS.map(d => (
          <button
            key={d.seconds}
            className={`dur-btn${duration === d.seconds ? ' dur-btn--on' : ''}`}
            onClick={() => handleDurationChange(d.seconds)}
          >
            {d.label}
          </button>
        ))}
      </div>

      <div className="timer-row">
        <span className="timer-display">{formatTime(seconds)}</span>
        <div className="timer-controls">
          <button className="timer-btn" onClick={() => setRunning(r => !r)}>
            {label}
          </button>
          <button
            className="timer-btn timer-btn--ghost"
            onClick={reset}
            disabled={atStart}
          >
            Reset
          </button>
        </div>
      </div>

      <div
        className="timer-progress"
        role="progressbar"
        aria-valuenow={progress}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Timer progress"
      >
        <div className="timer-progress-fill" style={{ width: `${progress}%` }} />
      </div>
    </div>
  )
}
