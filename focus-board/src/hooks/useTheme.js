import { useState, useEffect } from 'react'

function getInitialTheme() {
  try {
    const stored = localStorage.getItem('fb_theme')
    if (stored === 'dark' || stored === 'light') return stored
  } catch (_) {}
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export function useTheme() {
  // Initialise from the same source as the inline script so React and the DOM agree
  const [theme, setTheme] = useState(getInitialTheme)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    try { localStorage.setItem('fb_theme', theme) } catch (_) {}
  }, [theme])

  const toggle = () => setTheme(t => (t === 'dark' ? 'light' : 'dark'))

  return [theme, toggle]
}
