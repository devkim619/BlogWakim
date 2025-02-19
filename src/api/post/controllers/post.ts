/**
 * post controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::post.post', ({ strapi }) => ({
    async create(ctx) {
        try {
            const { data } = ctx.request.body;
            const user = ctx.state.user;

            // Ensure tags is an array
            const tags = Array.isArray(data.tags) ? data.tags : [];

            // Generate slug from title if not provided
            const slug = data.slug || data.title.toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/^-+|-+$/g, '');

            // Format data with proper relations
            const formattedData = {
                ...data,
                slug: slug,
                author: { connect: { id: user.id } }, // Properly format the relation
                category: data.category && data.category.id ? { connect: { id: data.category.id } } : undefined, // Properly format the relation
                thumbnail: {
                    id: data.thumbnail.id,
                    name: data.thumbnail.name,
                    alternativeText: data.thumbnail.alternativeText,
                    caption: data.thumbnail.caption,
                    width: data.thumbnail.width,
                    height: data.thumbnail.height,
                    formats: data.thumbnail.formats,
                    hash: data.thumbnail.hash,
                    ext: data.thumbnail.ext,
                    mime: data.thumbnail.mime,
                    size: data.thumbnail.size,
                    url: data.thumbnail.url,
                    previewUrl: data.thumbnail.previewUrl,
                    provider: data.thumbnail.provider,
                    provider_metadata: data.thumbnail.provider_metadata,
                    createdAt: data.thumbnail.createdAt,
                    updatedAt: data.thumbnail.updatedAt,
                    publishedAt: data.thumbnail.publishedAt,
                    locale: data.thumbnail.locale
                },
                tags: { connect: tags.map(tag => ({ id: tag.id })) } // Properly format the tags relation
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
