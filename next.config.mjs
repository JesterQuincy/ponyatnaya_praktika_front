/** @type {import('next').NextConfig} */
const securityHeaders = [
  {
    key: 'Content-Security-Policy',
    value:
      "script-src 'self' 'unsafe-inline'; img-src * data:; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;",
  },
  {
    //Заставляет браузер использовать только HTTPS, предотвращая атаки типа «downgrade» и MITM.
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
  {
    //Запрещает браузеру «угадывать» MIME-тип, предотвращая атаки через подделку типов.
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  {
    //Запрещает вставлять сайт в iframe на других сайтах, защищая от кликджекинга.
    key: 'X-Frame-Options',
    value: 'DENY',
  },
  {
    //Управляет тем, какая информация реферера отправляется на другие сайты.
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin',
  },
  {
    //	Контролирует доступ к API браузера (геолокация, камера, микрофон и др.).
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=()',
  },
]

const nextConfig = {
  reactStrictMode: true,
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
    ]
  },
}

export default nextConfig
