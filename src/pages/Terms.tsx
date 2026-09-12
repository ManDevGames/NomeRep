const sections = [
  {
    title: 'Educational purpose',
    body: 'Relationship Guide provides educational and self-reflection content, including a free assessment, guided programs, and access to independent counselors. It is not a medical or mental health diagnostic service.',
  },
  {
    title: 'Not a crisis service',
    body: 'If you are in crisis or need immediate support, please contact a licensed mental health professional or local emergency services. Relationship Guide is not equipped for emergency intervention.',
  },
  {
    title: 'Programs and sessions',
    body: 'Programs are self-paced and delivered as described on each program page. 1:1 sessions are conducted by independent counselors; scheduling and fees are shown at the time of booking.',
  },
  {
    title: 'Payments',
    body: 'All prices are listed in Indian Rupees (₹). This prototype does not process real payments; a production version would integrate secure payment gateways including UPI.',
  },
]

export function Terms() {
  return (
    <section className="section-space bg-cream-50">
      <div className="container-app max-w-3xl">
        <span className="eyebrow">Legal</span>
        <h1 className="mt-3 text-3xl sm:text-4xl font-semibold">Terms of Service</h1>
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
