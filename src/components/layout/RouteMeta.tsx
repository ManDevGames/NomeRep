import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { notFoundMeta, pageMeta } from '@/config/seo'
import { site } from '@/config/site'
import { useLanguage } from '@/context/language'
import { loadAnalytics, trackPageView } from '@/lib/analytics'

function setTag(selector: string, create: () => HTMLElement, attr: string, value: string) {
  let el = document.head.querySelector<HTMLElement>(selector)
  if (!el) {
    el = create()
    document.head.appendChild(el)
  }
  el.setAttribute(attr, value)
}

const metaTag = (key: 'name' | 'property', name: string) => () => {
  const el = document.createElement('meta')
  el.setAttribute(key, name)
  return el
}

/** Keeps the document title, description, canonical and robots tags in step with the route and language. */
export function RouteMeta() {
  const { pathname } = useLocation()
  const { t } = useLanguage()
  const path = pathname !== '/' ? pathname.replace(/\/+$/, '') : pathname
  const meta = pageMeta[path] ?? notFoundMeta

  useEffect(() => {
    const title = t(meta.title)
    const description = t(meta.description)
    const url = `${site.siteUrl}${path}`
    document.title = title
    setTag('meta[name="description"]', metaTag('name', 'description'), 'content', description)
    setTag('meta[property="og:title"]', metaTag('property', 'og:title'), 'content', title)
    setTag('meta[property="og:description"]', metaTag('property', 'og:description'), 'content', description)
    setTag('meta[property="og:url"]', metaTag('property', 'og:url'), 'content', url)
    setTag('meta[name="robots"]', metaTag('name', 'robots'), 'content', meta.noindex ? 'noindex' : 'index, follow')
    setTag('link[rel="canonical"]', () => Object.assign(document.createElement('link'), { rel: 'canonical' }), 'href', url)
  }, [meta, path, t])

  useEffect(() => {
    loadAnalytics()
    trackPageView()
  }, [path])

  return null
}
