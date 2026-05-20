import { useState } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { useAmbientAudio } from '../hooks/useAmbientAudio'

const SOUNDS = [
  { key: 'rain',  label: 'Rain' },
  { key: 'brown', label: 'Brown noise' },
  { key: 'dark',  label: 'Dark noise' },
]

export default function FlowSound() {
  const [sound, setSound]     = useLocalStorage('fb_sound', 'rain')
  const [volume, setVolume]   = useLocalStorage('fb_volume', 0.5)
  const [musicLink, setMusicLink] = useLocalStorage('fb_music_link', '')
  const [linkDraft, setLinkDraft] = useState('')
  const [editingLink, setEditingLink] = useState(false)

  const { playing, play, pause, updateVolume } = useAmbientAudio()

  function handleToggle() {
    playing ? pause() : play(sound, volume)
  }

  function handleSoundChange(key) {
    setSound(key)
    if (playing) play(key, volume)
  }

  function handleVolumeChange(e) {
    const v = parseFloat(e.target.value)
    setVolume(v)
    updateVolume(v)
  }

  function handleSaveLink() {
    const trimmed = linkDraft.trim()
    if (!trimmed) return
    setMusicLink(trimmed)
    setEditingLink(false)
    setLinkDraft('')
  }

  function handleEditLink() {
    setLinkDraft(musicLink)
    setEditingLink(true)
  }

  function handleClearLink() {
    setMusicLink('')
    setEditingLink(false)
    setLinkDraft('')
  }

  const showInput = !musicLink || editingLink

  return (
    <div className="card flow-card">
      <span className="section-label">Flow sound</span>

      {/* Sound selector */}
      <div className="sound-selector">
        {SOUNDS.map(({ key, label }) => (
          <button
            key={key}
            className={`sound-btn${sound === key ? ' sound-btn--on' : ''}`}
            onClick={() => handleSoundChange(key)}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Play + volume on one row */}
      <div className="volume-row">
        <button
          className={`play-btn${playing ? ' play-btn--on' : ''}`}
          onClick={handleToggle}
          aria-label={playing ? 'Pause sound' : 'Play sound'}
        >
          {playing ? '▐▐' : '▶'}
        </button>
        <input
          type="range"
          className="volume-slider"
          min={0}
          max={1}
          step={0.01}
          value={volume}
          onChange={handleVolumeChange}
          aria-label="Volume"
        />
        <span className="volume-pct">{Math.round(volume * 100)}%</span>
      </div>

      {/* Music link */}
      <div className="music-area">
        {showInput ? (
          <div className="add-row music-input-row">
            <input
              className="add-input"
              type="url"
              value={linkDraft}
              onChange={e => setLinkDraft(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSaveLink()}
              placeholder="Paste a music link (YouTube, Spotify…)"
              autoComplete="off"
            />
            {editingLink && (
              <button className="music-cancel-btn" onClick={() => setEditingLink(false)}>
                Cancel
              </button>
            )}
            {!editingLink && (
              <button
                className="music-save-btn"
                onClick={handleSaveLink}
                disabled={!linkDraft.trim()}
              >
                Save
              </button>
            )}
          </div>
        ) : (
          <div className="music-saved-row">
            <a
              href={musicLink}
              target="_blank"
              rel="noopener noreferrer"
              className="music-open-link"
            >
              Open music ↗
            </a>
            <div className="music-saved-actions">
              <button className="music-text-btn" onClick={handleEditLink}>Edit</button>
              <span className="music-sep">·</span>
              <button className="music-text-btn" onClick={handleClearLink}>Remove</button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
