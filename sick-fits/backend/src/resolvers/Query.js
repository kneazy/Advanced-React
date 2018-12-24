const { forwardTo } = require('prisma-binding');
const { hasPermission } = require('../utils');

const Query = {
  items: forwardTo('db'),
  item: forwardTo('db'),
  itemsConnection: forwardTo('db'),
  me(paren, args, ctx, info) {
    // check if there is current user id
    if(!ctx.request.userId) {
      return null;
    }
    return ctx.db.query.user({
      where: { id: ctx.request.userId }
    },
     info
    );
  },
  async users(parent, args, ctx, info) {
    // 1. Check if they are  logged in
    if(!ctx.request.userId) {
      throw new Error('You must be logged in!');
    }
    // 2. Check in the user has the permissions to query all the users
    hasPermission(ctx.request.user, ['ADMIN', 'PERMISSIONUDATE']);
    // 3. if they do, query all the users!
    return ctx.db.query.users({}, info);
  }
};

module.exports = Query;
