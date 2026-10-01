import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import type { HtmlTagDescriptor, Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import { site } from './src/config/site'
import { pageMeta } from './src/config/seo'

/**
 * Bakes SEO into the static build from src/config: social-preview and JSON-LD
 * tags in index.html (WhatsApp/Instagram/Facebook previews don't run JavaScript),
 * plus robots.txt and sitemap.xml.
 */
function seo(): Plugin {
  const home = pageMeta['/']
  const ogImage = `${site.siteUrl}/og-image.png`
  const whatsapp = `+${site.contact.whatsappNumber}`

  const person = {
    '@type': 'Person',
    '@id': `${site.siteUrl}/#shalinee`,
    name: site.coachName,
    jobTitle: site.tagline.en,
    description: site.positioning.en,
    url: `${site.siteUrl}/about`,
    image: ogImage,
    knowsLanguage: ['en', 'hi', 'mr'],
    sameAs: [site.social.instagram, site.social.youtube],
  }
  const service = {
    '@type': 'ProfessionalService',
    '@id': `${site.siteUrl}/#coaching`,
    name: `${site.coachName} – ${site.tagline.en}`,
    description: home.description.en,
    url: site.siteUrl,
    image: ogImage,
    telephone: whatsapp,
    areaServed: 'IN',
    availableLanguage: ['English', 'Hindi', 'Marathi'],
    founder: { '@id': person['@id'] },
  }
  const jsonLd = JSON.stringify({ '@context': 'https://schema.org', '@graph': [person, service] }).replace(/</g, '\\u003c')

  const meta = (attrs: Record<string, string>): HtmlTagDescriptor => ({ tag: 'meta', attrs, injectTo: 'head' })

  return {
    name: 'shalinee-seo',
    transformIndexHtml(html) {
      return {
        html: html.replace('<title></title>', `<title>${home.title.en}</title>`),
        tags: [
          meta({ name: 'description', content: home.description.en }),
          meta({ property: 'og:type', content: 'website' }),
          meta({ property: 'og:site_name', content: site.coachName }),
          meta({ property: 'og:title', content: home.title.en }),
          meta({ property: 'og:description', content: home.description.en }),
          meta({ property: 'og:url', content: `${site.siteUrl}/` }),
          meta({ property: 'og:image', content: ogImage }),
          meta({ property: 'og:image:width', content: '1200' }),
          meta({ property: 'og:image:height', content: '630' }),
          meta({ property: 'og:image:alt', content: `${site.coachName} · ${site.tagline.en}` }),
          meta({ property: 'og:locale', content: 'en_IN' }),
          meta({ name: 'twitter:card', content: 'summary_large_image' }),
          meta({ name: 'twitter:title', content: home.title.en }),
          meta({ name: 'twitter:description', content: home.description.en }),
          meta({ name: 'twitter:image', content: ogImage }),
          { tag: 'script', attrs: { type: 'application/ld+json' }, children: jsonLd, injectTo: 'head' },
        ],
      }
    },
    generateBundle() {
      const urls = Object.entries(pageMeta)
        .filter(([, m]) => !m.noindex)
        .map(([path]) => `  <url><loc>${site.siteUrl}${path}</loc></url>`)
        .join('\n')
      this.emitFile({
        type: 'asset',
        fileName: 'sitemap.xml',
        source: `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
      })
      this.emitFile({
        type: 'asset',
        fileName: 'robots.txt',
        source: `User-agent: *\nAllow: /\n\nSitemap: ${site.siteUrl}/sitemap.xml\n`,
      })
    },
  }
}

export default defineConfig({
  plugins: [react(), seo()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
