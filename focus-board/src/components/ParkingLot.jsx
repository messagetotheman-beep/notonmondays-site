import { useState } from 'react'

export default function ParkingLot({ items, setItems }) {
  const [input, setInput] = useState('')

  const add = () => {
    const text = input.trim()
    if (!text) return
    setItems([...items, { id: Date.now(), text }])
    setInput('')
  }

  const remove = (id) => setItems(items.filter(item => item.id !== id))

  return (
    <div className="card bottom-card">
      <span className="section-label">Parking lot</span>
      <p className="card-hint">Capture distracting thoughts</p>
      <div className="add-row">
        <input
          className="add-input"
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && add()}
          placeholder="Note it and move on"
          maxLength={200}
          autoComplete="off"
        />
        <button className="add-btn" onClick={add} aria-label="Add to parking lot">+</button>
      </div>
      <ul className="lot-list">
        {items.length === 0 ? (
          <li className="empty-state">Nothing parked yet</li>
        ) : (
          items.map(item => (
            <li key={item.id} className="lot-item">
              <span>{item.text}</span>
              <button className="remove-btn" onClick={() => remove(item.id)} aria-label="Remove">×</button>
            </li>
          ))
        )}
      </ul>
    </div>
  )
}
