import { watchEffect } from 'vue'
import { useRoute } from 'vue-router'

export function useMeta(options) {
  const route = useRoute()
  
  watchEffect(() => {
    const defaults = {
      title: 'João Coelho | Software Engineer',
      description: 'Software Engineer specializing in full-stack development, AI, and cybersecurity. Master\'s student at University of Minho.',
      image: 'https://joaocoelho.xyz/profileHD.png',
      type: 'website',
      ...options
    }

    document.title = defaults.title

    updateMetaTag('description', defaults.description)
    updateMetaTag('og:title', defaults.title)
    updateMetaTag('og:description', defaults.description)
    updateMetaTag('og:image', defaults.image)
    updateMetaTag('og:type', defaults.type)
    updateMetaTag('og:url', window.location.href)
    updateMetaTag('twitter:title', defaults.title)
    updateMetaTag('twitter:description', defaults.description)
    updateMetaTag('twitter:image', defaults.image)
    updateMetaTag('twitter:url', window.location.href)

    updateJsonLd(defaults)
  })
}

function updateMetaTag(name, content) {
  let element = document.querySelector(`meta[property="${name}"]`) ||
                document.querySelector(`meta[name="${name}"]`)

  if (!element) {
    element = document.createElement('meta')
    element.setAttribute(name.includes('og:') || name.includes('twitter:') ? 'property' : 'name', name)
    document.head.appendChild(element)
  }

  element.setAttribute('content', content)
}

function updateJsonLd(defaults) {
  let script = document.querySelector('script[type="application/ld+json"]')
  if (!script) {
    script = document.createElement('script')
    script.type = 'application/ld+json'
    document.head.appendChild(script)
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'João Coelho',
    url: 'https://joaocoelho.xyz',
    image: defaults.image,
    description: defaults.description,
    sameAs: [
      'https://github.com/JoaoCoelho2003',
      'https://www.linkedin.com/in/joaocoelho03/'
    ],
    jobTitle: 'Software Engineer',
    worksFor: {
      '@type': 'Organization',
      name: 'University of Minho',
      url: 'https://www.uminho.pt'
    },
    alumniOf: {
      '@type': 'Organization',
      name: 'University of Minho',
      url: 'https://www.uminho.pt'
    }
  }

  script.textContent = JSON.stringify(jsonLd)
}