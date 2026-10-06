import type { ReactNode } from 'react'

/** Label + control + error message. Give the control `id`, and `aria-describedby={`${id}-error`}` when there's an error. */
export function Field({ id, label, error, required, children }: { id: string; label: string; error?: string; required?: boolean; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-medium text-charcoal-800">
        {label}
        {required && (
          <span className="ml-0.5 text-rose-500" aria-hidden="true">
            *
          </span>
        )}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="text-sm text-rose-500">
          {error}
        </p>
      )}
    </div>
  )
}
