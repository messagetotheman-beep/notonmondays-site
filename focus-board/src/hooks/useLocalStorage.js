import { useState, useEffect } from 'react'

export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const item = localStorage.getItem(key)
      if (item === null) return initialValue
      const parsed = JSON.parse(item)
      // Guard against stored "null" deserialising to JS null
      return parsed ?? initialValue
    } catch {
      return initialValue
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch {
      // storage unavailable
    }
  }, [key, value])

  return [value, setValue]
}
