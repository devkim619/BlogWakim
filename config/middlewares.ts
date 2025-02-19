module.exports = ({ env }) => [
  "strapi::errors",
  {
    name: "strapi::security",
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          "connect-src": ["'self'", "https:"],
          "default-src": ["'self'"],
          "img-src": [
            "'self'",
            "data:",
            "blob:",
            "market-assets.strapi.io",
            env("SUPABASE_URL"),
          ],
          "media-src": [
            "'self'",
            "data:",
            "blob:",
            "market-assets.strapi.io",
            env("SUPABASE_URL"),
          ],
        },
      },
    },
  },
  {
    name: "strapi::cors",
    config: {
      origin: env("CORS_ORIGIN", "").split(","),
      headers: ['Content-Type', 'Authorization', 'Origin', 'Accept'],
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS'],
      credentials: true,

    },
  },
  {
    name: "strapi::session",
    config: {
      enabled: true,
      key: "strapi.sid",
      httpOnly: true,
      secure: env("NODE_ENV") === "production",
      maxAge: 86400000,
      sameSite: "lax",
    },
  },
  {
    name: "strapi::poweredBy",
    config: {
      enabled: false,
    },
  },
  "strapi::logger",
  "strapi::query",
  "strapi::body",
  "strapi::favicon",
  "strapi::public",
];
