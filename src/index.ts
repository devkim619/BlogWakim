import type { Core } from '@strapi/strapi';
import axios from 'axios';

export default {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/* { strapi }: { strapi: Core.Strapi } */) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  async bootstrap({ strapi }: { strapi: Core.Strapi }) {
    const PING_INTERVAL = 40000; // 40 วินาที
    const url = 'https://blog-strapi-w691.onrender.com'; // URL ของ Strapi

    setInterval(async () => {
      try {
        const response = await axios.get(url);
        strapi.log.info(`Ping successful: ${response.status} ${response.statusText}`);
      } catch (error: any) {
        strapi.log.error(`Ping failed: ${error.message}`);
      }
    }, PING_INTERVAL);

    strapi.log.info('Ping service initialized to prevent Render sleep mode');
  },
};
