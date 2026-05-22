// ============================================================
// useSEO.ts
// A reusable hook to dynamically update per-page SEO meta tags.
// Call this at the top of every page component.
// ============================================================

import { useEffect } from 'react';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  canonical?: string;
  ogImage?: string;
}

export function useSEO({
  title,
  description,
  keywords,
  canonical,
  ogImage = 'https://www.klanvision.com/og-image.jpg',
}: SEOProps) {
  useEffect(() => {
    // ── Title ────────────────────────────────────────────────
    document.title = title;

    // ── Helper: get or create a <meta> tag ───────────────────
    const setMeta = (selector: string, attr: string, value: string) => {
      let el = document.querySelector<HTMLMetaElement>(selector);
      if (!el) {
        el = document.createElement('meta');
        const [attrName, attrVal] = attr.split('=');
        el.setAttribute(attrName, attrVal.replace(/"/g, ''));
        document.head.appendChild(el);
      }
      el.setAttribute('content', value);
    };

    const setLink = (rel: string, href: string) => {
      let el = document.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
      if (!el) {
        el = document.createElement('link');
        el.setAttribute('rel', rel);
        document.head.appendChild(el);
      }
      el.setAttribute('href', href);
    };

    // ── Standard Meta ────────────────────────────────────────
    setMeta('meta[name="description"]', 'name=description', description);
    if (keywords) setMeta('meta[name="keywords"]', 'name=keywords', keywords);

    // ── Canonical ────────────────────────────────────────────
    if (canonical) setLink('canonical', canonical);

    // ── Open Graph ───────────────────────────────────────────
    setMeta('meta[property="og:title"]', 'property=og:title', title);
    setMeta('meta[property="og:description"]', 'property=og:description', description);
    setMeta('meta[property="og:image"]', 'property=og:image', ogImage);
    if (canonical) setMeta('meta[property="og:url"]', 'property=og:url', canonical);

    // ── Twitter ──────────────────────────────────────────────
    setMeta('meta[name="twitter:title"]', 'name=twitter:title', title);
    setMeta('meta[name="twitter:description"]', 'name=twitter:description', description);
    setMeta('meta[name="twitter:image"]', 'name=twitter:image', ogImage);

    // ── Cleanup: restore home defaults on unmount ─────────────
    return () => {
      document.title = 'Klanvision – Digital Innovations for Corporate Success';
      setMeta('meta[name="description"]', 'name=description',
        'Klanvision – Unique, Safe, and Scalable Digital Innovations for Corporate Success. Web development, mobile apps, cloud services, SEO and more.');
      setLink('canonical', 'https://www.klanvision.com/');
    };
  }, [title, description, keywords, canonical, ogImage]);
}
