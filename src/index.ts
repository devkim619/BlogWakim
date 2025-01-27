import type { Core } from '@strapi/strapi';
import axios, { AxiosError } from 'axios';

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
    // More aggressive ping interval to prevent sleep
    const PING_INTERVAL = 15000; // 15 seconds (instead of 30)
    const url = 'https://blogwakim.onrender.com'; // Strapi URL
    const MAX_RETRY_ATTEMPTS = 3;

    const pingService = async (attempt = 1) => {
      try {
        const startTime = Date.now();
        const response = await axios.get(url, { 
          timeout: 7000, // Reduced timeout to 7 seconds
          validateStatus: (status) => status >= 200 && status < 300 
        });
        const endTime = Date.now();
        const responseDuration = endTime - startTime;

        strapi.log.info(`Ping successful: ${response.status} ${response.statusText} (${responseDuration}ms)`);
        
        // Log performance metrics
        if (responseDuration > 5000) {
          strapi.log.warn(`Slow response detected: ${responseDuration}ms`);
        }
      } catch (error: unknown) {
        if (error instanceof AxiosError) {
          strapi.log.error(`Ping attempt ${attempt} failed: ${error.message}`);
          
          if (attempt < MAX_RETRY_ATTEMPTS) {
            await new Promise(resolve => setTimeout(resolve, 3000)); // Reduced wait time
            return pingService(attempt + 1);
          }
        }
        
        strapi.log.error('Ping service failed after maximum retry attempts');
      }
    };

    // Initial immediate ping to wake up the service
    await pingService();

    // Setup interval with retry mechanism
    const intervalId = setInterval(pingService, PING_INTERVAL);

    strapi.log.info('Aggressive ping service initialized to prevent Render sleep mode');

    // Cleanup function
    return () => {
      clearInterval(intervalId);
      strapi.log.info('Ping service stopped');
    };
  },
};
