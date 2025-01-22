export default [
  'strapi::errors',
  {
    name: 'strapi::security',
    config: {
      contentSecurityPolicy: {
        directives: {
          'default-src': ["'self'", 'https:'],
          'img-src': [
            "'self'",
            'data:',
            'blob:',
            'https://market-assets.strapi.io',
            'https://hwlnatepusmcpmnmlroe.supabase.co', // เพิ่ม URL ของ Supabase
          ],
          'media-src': [
            "'self'",
            'data:',
            'blob:',
            'https://hwlnatepusmcpmnmlroe.supabase.co', // เพิ่ม URL ของ Supabase
          ],
          'connect-src': ["'self'", 'https:'],
        },
      },
    },
  },
  'strapi::cors',
  'strapi::poweredBy',
  'strapi::logger',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];
