const router = require("koa-router")();
const controller = require("../controller/c-posts");

router.get("/", controller.getRedirectPosts);
router.get("/posts", controller.getPosts);
router.post("/posts/page", controller.postPostsPage);
router.post("/posts/self/page", controller.postSelfPage);
router.get("/posts/:postId", controller.getSinglePosts);
router.get("/create", controller.getCreate);
router.post("/create", controller.postCreate);
router.post("/:postId", controller.postComment);
router.get("/posts/:postId/edit", controller.getEditPage);
router.post("/posts/:postId/edit", controller.postEditPage);
router.post("/posts/:postId/remove", controller.postDeletePost);
router.post(
  "/posts/:postId/comment/:commentId/remove",
  controller.postDeleteComment
);
router.post("/posts/:postId/commentPage", controller.postCommentPage);

module.exports = router;
