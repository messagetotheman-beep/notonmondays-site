export default function FocusInput({ focus, setFocus, nextStep, setNextStep }) {
  return (
    <div className="card focus-card">
      <label className="section-label" htmlFor="focus-input">Today's focus</label>
      <input
        id="focus-input"
        className="focus-input"
        type="text"
        value={focus}
        onChange={e => setFocus(e.target.value)}
        placeholder="What matters most today?"
        maxLength={120}
        autoComplete="off"
      />
      <input
        id="next-step-input"
        className="next-step-input"
        type="text"
        value={nextStep ?? ''}
        onChange={e => setNextStep(e.target.value)}
        placeholder="What is the next small step?"
        maxLength={120}
        autoComplete="off"
        aria-label="Next step"
      />
    </div>
  )
}
