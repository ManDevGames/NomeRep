import { Compass } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { useLanguage } from '@/context/language'

export function NotFound() {
  const { t } = useLanguage()

  return (
    <section className="section-space flex min-h-[70vh] items-center bg-cream-50">
      <div className="container-app flex flex-col items-center gap-6 text-center">
        <Compass size={40} className="text-rose-300" />
        <h1 className="text-3xl sm:text-4xl font-semibold">{t('This page wandered off', 'यह पेज कहीं खो गया')}</h1>
        <p className="max-w-md text-base text-charcoal-500">
          {t(
            'We couldn’t find what you were looking for. Let’s get you back on track.',
            'आप जो ढूँढ रहे थे, वह हमें नहीं मिला। चलिए, आपको सही रास्ते पर वापस ले चलते हैं।',
          )}
        </p>
        <Button to="/">{t('Back to Home', 'होम पर लौटें')}</Button>
      </div>
    </section>
  )
}
