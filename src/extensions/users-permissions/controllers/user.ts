import { factories } from '@strapi/strapi';
import { Context } from 'koa';

const userController = factories.createCoreController('plugin::users-permissions.user', ({ strapi }) => ({
  async me(ctx: Context) {
    const user = ctx.state.user;

    if (!user) {
      return ctx.unauthorized();
    }

    const userWithRole = await strapi.db.query('plugin::users-permissions.user').findOne({
        where: { id: user.id },
        populate: ['role'],
      });
      

    if (!userWithRole) {
      return ctx.notFound('User not found');
    }

    // Return sanitized user data พร้อม Role
    const sanitizedUser = await this.sanitizeOutput(userWithRole, ctx);

    return sanitizedUser;
  },
}));

export default userController;
