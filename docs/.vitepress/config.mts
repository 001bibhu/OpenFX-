import { defineConfig } from 'vitepress'

const base = process.env.VP_BASE_PATH ?? '/OpenFX-/'

export default defineConfig({
  base,
  title: 'OpenFX Docs',
  description:
    'Documentation for OpenFX, cross-border FX liquidity and payment infrastructure for institutions.',
  lang: 'en-US',
  cleanUrls: true,
  lastUpdated: true,

  head: [
    ['meta', { name: 'theme-color', content: '#0392F1' }],
    ['link', { rel: 'icon', href: `${base}favicon.svg` }],
    [
      'link',
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap',
      },
    ],
  ],

  themeConfig: {
    logo: {
      light: '/logo.svg',
      dark: '/logo-light.svg',
      alt: 'OpenFX',
    },
    siteTitle: 'Docs',

    nav: [
      { text: "What's new", link: '/whats-new/' },
      { text: 'Developer Community', link: '/developer-community/' },
      {
        text: 'Guides',
        items: [
          { text: 'Overview', link: '/core/overview' },
          { text: 'Getting started', link: '/core/getting-started' },
          { text: 'FAQ', link: '/core/faq' },
          { text: 'Admin guide', link: '/core/admin-guide' },
          { text: 'Troubleshooting', link: '/core/troubleshooting' },
        ],
      },
      {
        text: 'API',
        items: [
          { text: 'API overview', link: '/platform/api-overview' },
          { text: 'Authentication', link: '/platform/authentication' },
          { text: 'API reference', link: '/platform/api-reference' },
        ],
      },
      {
        text: 'Solutions',
        items: [
          { text: 'Overview', link: '/integrations/overview' },
          { text: 'Remittance companies', link: '/integrations/remittance-companies' },
          { text: 'Payment service providers', link: '/integrations/payment-service-providers' },
          { text: 'On and off ramps', link: '/integrations/on-and-off-ramps' },
        ],
      },
      {
        text: 'Support',
        items: [
          { text: 'Get a demo', link: 'https://www.openfx.com/' },
          { text: 'Create ticket', link: '/support/create-ticket' },
          { text: 'Suggest a feature', link: '/feature-ideas/' },
          { text: 'Developer Community', link: '/developer-community/' },
          { text: 'Contact', link: '/support/contact-support' },
        ],
      },
      { text: 'Get a demo', link: 'https://www.openfx.com/' },
      { text: 'Suggest a feature', link: '/feature-ideas/' },
    ],

    sidebar: {
      '/core/': [
        {
          text: 'Guides',
          collapsed: false,
          items: [
            { text: 'OpenFX Overview', link: '/core/overview' },
            { text: 'Getting started with OpenFX', link: '/core/getting-started' },
            { text: 'How it works', link: '/core/how-it-works' },
            { text: 'Use cases', link: '/core/use-cases' },
            { text: 'FAQ', link: '/core/faq' },
            { text: 'Admin guide', link: '/core/admin-guide' },
            { text: 'Troubleshooting', link: '/core/troubleshooting' },
          ],
        },
      ],
      '/whats-new/': [
        {
          text: "What's new",
          collapsed: false,
          items: [{ text: 'Release notes & updates', link: '/whats-new/' }],
        },
      ],
      '/platform/': [
        {
          text: 'API reference',
          collapsed: false,
          items: [
            { text: 'API overview', link: '/platform/api-overview' },
            { text: 'Authentication', link: '/platform/authentication' },
            { text: 'API reference', link: '/platform/api-reference' },
          ],
        },
      ],
      '/integrations/': [
        {
          text: 'Solutions',
          collapsed: false,
          items: [
            { text: 'Overview', link: '/integrations/overview' },
            { text: 'Remittance companies', link: '/integrations/remittance-companies' },
            { text: 'Payment service providers', link: '/integrations/payment-service-providers' },
            { text: 'On and off ramps', link: '/integrations/on-and-off-ramps' },
          ],
        },
      ],
      '/developer-community/': [
        {
          text: 'Community',
          collapsed: false,
          items: [{ text: 'Developer Community', link: '/developer-community/' }],
        },
      ],
      '/feature-ideas/': [
        {
          text: 'Community',
          collapsed: false,
          items: [{ text: 'Suggest a feature', link: '/feature-ideas/' }],
        },
      ],
      '/support/': [
        {
          text: 'Support',
          collapsed: false,
          items: [
            { text: 'Get a demo', link: 'https://www.openfx.com/' },
            { text: 'Create a ticket', link: '/support/create-ticket' },
            { text: 'Suggest a feature', link: '/feature-ideas/' },
            { text: 'Contact support', link: '/support/contact-support' },
          ],
        },
      ],
      '/admin/': [
        {
          text: 'Administration',
          items: [{ text: 'Documentation analytics', link: '/admin/analytics' }],
        },
      ],
    },

    search: {
      provider: 'local',
      options: { detailedView: true },
    },

    socialLinks: [{ icon: 'globe', link: 'https://www.openfx.com/' }],

    footer: {
      message: 'OpenFX — making money move as freely as data.',
      copyright: 'Copyright © 2026 Red Envelope Delta, Inc. (OpenFX)',
    },

    docFooter: { prev: 'Previous', next: 'Next' },
    outline: { level: [2, 3], label: 'On this page' },
  },
})
