import { useCallback, useEffect, useState } from 'react'

const STORAGE_KEY = 'relationship-guide:reflection-notes'

function loadNotes(): Record<string, string> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as Record<string, string>) : {}
  } catch {
    return {}
  }
}

export function useReflection() {
  const [notes, setNotes] = useState<Record<string, string>>(() => loadNotes())
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    setSaved(false)
  }, [notes])

  const updateNote = useCallback((promptId: string, value: string) => {
    setNotes((prev) => ({ ...prev, [promptId]: value }))
  }, [])

  const save = useCallback(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(notes))
      setSaved(true)
    } catch {
      // ignore
    }
  }, [notes])

  return { notes, updateNote, save, saved }
}
