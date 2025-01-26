import type { StrapiApp } from '@strapi/strapi/admin';
import AuthLogo from './extensions/icon2.svg';
import MenuLogo from './extensions/icon2.svg';
import Favicon from './extensions/favicon.png';

export default {
  config: { 
    locales: [
      // 'ar',
      // 'fr',
      // 'cs',
      // 'de',
      // 'dk',
      // 'es',
      // 'he',
      // 'id',
      // 'it',
      // 'ja',
      // 'ko',
      // 'ms',
      // 'nl',
      // 'no',
      // 'pl',
      // 'pt-BR',
      // 'pt',
      // 'ru',
      // 'sk',
      // 'sv',
      // 'th',
      // 'tr',
      // 'uk',
      // 'vi',
      // 'zh-Hans',
      // 'zh',
      'th',
      'en',
    ],
    auth: { // Replace the Strapi logo in auth (login) views
        logo: AuthLogo,
      },
      menu: { // Replace the Strapi logo in the main navigation
        logo: MenuLogo,
      },
      head: {
        favicon: Favicon,
      },
    theme: {
        colors: {
          primary100: "#f6ecfc",
          primary200: "#e0c1f4",
          primary500: "#ac73e6",
          primary600: "#9736e8",
          primary700: "#8312d1",
          danger700: "#b72b1a",
        },
      },
  },
  bootstrap(app: StrapiApp) {
    console.log(app);
  },
};
