const router = require("koa-router")();

router.get("/signout", async (ctx, next) => {
  ctx.session = null;
  console.log("Sign out successfully");
  ctx.body = true;
});

module.exports = router;
