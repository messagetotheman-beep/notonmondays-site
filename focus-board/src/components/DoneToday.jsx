export default function DoneToday({ items, setItems }) {
  const remove = (id) => setItems(items.filter(item => item.id !== id))

  return (
    <div className="card bottom-card">
      <span className="section-label">Done today</span>
      <p className="card-hint">What you've finished</p>
      <ul className="lot-list">
        {items.length === 0 ? (
          <li className="empty-state">Complete a task to see it here</li>
        ) : (
          items.map(item => (
            <li key={item.id} className="lot-item done-item">
              <span>{item.text}</span>
              <button className="remove-btn" onClick={() => remove(item.id)} aria-label="Remove">×</button>
            </li>
          ))
        )}
      </ul>
    </div>
  )
}
