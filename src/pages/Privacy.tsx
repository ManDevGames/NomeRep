const sections = [
  {
    title: 'What we collect',
    body: 'Assessment responses, reflection notes, and contact details you provide (such as when downloading a guide or booking a session) are stored to personalize your experience on Relationship Guide.',
  },
  {
    title: 'How we use it',
    body: 'Your data is used only to run and improve Relationship Guide — to generate your personalized pattern, save your reflections, and manage bookings. We do not sell your personal data.',
  },
  {
    title: 'Where it’s stored',
    body: 'In this prototype, assessment and reflection data is stored locally on your device. A production version would use encrypted, access-controlled storage.',
  },
  {
    title: 'Your choices',
    body: 'You can clear your assessment and reflection data at any time by clearing your browser’s local storage for this site, or by contacting us directly.',
  },
]

export function Privacy() {
  return (
    <section className="section-space bg-cream-50">
      <div className="container-app max-w-3xl">
        <span className="eyebrow">Legal</span>
        <h1 className="mt-3 text-3xl sm:text-4xl font-semibold">Privacy Policy</h1>
        <p className="mt-4 text-sm text-charcoal-500">Last updated September 2026</p>

        <div className="mt-10 flex flex-col gap-8">
          {sections.map((s) => (
            <div key={s.title}>
              <h2 className="text-xl font-semibold text-charcoal-900">{s.title}</h2>
              <p className="mt-2 text-base leading-relaxed text-charcoal-600">{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
