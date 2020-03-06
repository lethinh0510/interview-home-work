const router = require("express").Router();
const CommentController = require("../controllers/CommentController");
const auth = require("../middlewares/auth");
router.post("/",auth.checkAuth, CommentController.create);
router.put("/:id",auth.checkAuth, CommentController.update);
module.exports = router;
