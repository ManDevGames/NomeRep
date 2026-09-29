export const inputClass = (hasError: boolean) =>
  `min-h-12 w-full rounded-xl border bg-cream-50 px-4 text-base text-charcoal-900 placeholder:text-charcoal-300 focus:border-rose-300 focus:outline-none ${
    hasError ? 'border-rose-400' : 'border-charcoal-300/50'
  }`
