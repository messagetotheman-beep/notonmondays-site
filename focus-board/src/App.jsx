import { useState } from 'react'
import { useLocalStorage } from './hooks/useLocalStorage'
import { useTheme } from './hooks/useTheme'
import FocusInput from './components/FocusInput'
import PriorityTasks from './components/PriorityTasks'
import PomodoroTimer from './components/PomodoroTimer'
import FlowSound from './components/FlowSound'
import ParkingLot from './components/ParkingLot'
import DoneToday from './components/DoneToday'
import './App.css'

const EMPTY_TASKS = [
  { text: '', done: false },
  { text: '', done: false },
  { text: '', done: false },
]

export default function App() {
  const [focus, setFocus] = useLocalStorage('fb_focus', '')
  const [tasks, setTasks] = useLocalStorage('fb_tasks', EMPTY_TASKS)
  const [done, setDone] = useLocalStorage('fb_done', [])
  const [parking, setParking] = useLocalStorage('fb_parking', [])
  const [nextStep, setNextStep] = useLocalStorage('fb_next_step', '')
  const [resetConfirm, setResetConfirm] = useState(false)
  const [theme, toggleTheme] = useTheme()

  const today = new Date().toLocaleDateString('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  const handleComplete = (text) => {
    setDone(prev => [...prev, { id: Date.now(), text }])
  }

  const handleReset = () => {
    if (!resetConfirm) {
      setResetConfirm(true)
      setTimeout(() => setResetConfirm(false), 3000)
      return
    }
    setFocus('')
    setTasks(EMPTY_TASKS)
    setDone([])
    setParking([])
    setNextStep('')
    setResetConfirm(false)
  }

  return (
    <div className="app">
      <header className="app-header">
        <div className="brand">
          <span className="brand-name">inFlow</span>
          <span className="brand-by">by Not On Mondays</span>
        </div>
        <div className="header-right">
          <span className="date-label">{today}</span>
          <button
            className="theme-btn"
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {theme === 'dark' ? '◐' : '◑'}
          </button>
          <button
            className={`reset-btn${resetConfirm ? ' reset-btn--confirm' : ''}`}
            onClick={handleReset}
          >
            {resetConfirm ? 'Confirm reset' : 'Reset day'}
          </button>
        </div>
      </header>

      <main className="app-main">
        <FocusInput focus={focus} setFocus={setFocus} nextStep={nextStep} setNextStep={setNextStep} />
        <PriorityTasks tasks={tasks} setTasks={setTasks} onComplete={handleComplete} />
        <PomodoroTimer />
        <FlowSound />
        <div className="bottom-row">
          <ParkingLot items={parking} setItems={setParking} />
          <DoneToday items={done} setItems={setDone} />
        </div>
      </main>
    </div>
  )
}
