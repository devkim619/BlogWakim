/**
 * post controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::post.post', ({ strapi }) => ({
    async create(ctx) {
        try {
            const { data } = ctx.request.body;
            const user = ctx.state.user;

            // Format data with proper relations
            const formattedData = {
                ...data,
                author: user.id, // Directly assign the user ID
                category: data.category.id, // Directly assign the category ID
                thumbnail: data.thumbnail?.id || null // Directly assign the thumbnail ID or null if missing
            };

            // Create sanitized request body
            ctx.request.body = {
                data: formattedData
            };

            // Debug log
            console.log('Formatted request data:', JSON.stringify(formattedData, null, 2));

            // Create the post
            const entity = await super.create(ctx);
            return entity;
        } catch (error) {
            console.error('Post creation error:', error);
            return ctx.throw(400, error);
        }
    }
}));
