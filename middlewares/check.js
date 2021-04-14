module.exports = {
  // if logged
  checkNotLogin: (ctx) => {
    if (ctx.session && ctx.session.user) {
      ctx.redirect("/posts");
      return false;
    }
    return true;
  },
  // if not logged
  checkLogin: (ctx) => {
    if (!ctx.session || !ctx.session.user) {
      ctx.redirect("/signin");
      return false;
    }
    return true;
  },
};
