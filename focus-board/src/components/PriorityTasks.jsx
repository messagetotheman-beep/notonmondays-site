const PLACEHOLDERS = [
  'One thing to move forward',
  'Another helpful step',
  'Only if there is capacity',
]

export default function PriorityTasks({ tasks, setTasks, onComplete }) {
  const handleTextChange = (index, text) => {
    setTasks(tasks.map((t, i) => i === index ? { ...t, text } : t))
  }

  const handleComplete = (index) => {
    const task = tasks[index]
    if (!task.text.trim()) return
    onComplete(task.text.trim())
    setTasks(tasks.map((t, i) => i === index ? { text: '', done: false } : t))
  }

  const handleKeyDown = (e, index) => {
    if (e.key === 'Enter' && index < tasks.length - 1) {
      e.preventDefault()
      document.getElementById(`task-${index + 1}`)?.focus()
    }
  }

  return (
    <div className="card">
      <span className="section-label">Three priorities</span>
      <div className="tasks-list">
        {tasks.map((task, i) => (
          <div key={i} className="task-row">
            <button
              className={`task-check${task.text.trim() ? ' active' : ''}`}
              onClick={() => handleComplete(i)}
              aria-label={`Complete task ${i + 1}`}
              disabled={!task.text.trim()}
            />
            <input
              id={`task-${i}`}
              className="task-input"
              type="text"
              value={task.text}
              onChange={e => handleTextChange(i, e.target.value)}
              onKeyDown={e => handleKeyDown(e, i)}
              placeholder={PLACEHOLDERS[i]}
              maxLength={100}
              autoComplete="off"
            />
          </div>
        ))}
      </div>
    </div>
  )
}
