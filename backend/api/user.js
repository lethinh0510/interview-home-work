const UserController = require("../controllers/Usercontroller");
const Validator = require("../validators/validator");
const router = require("express").Router();
const auth = require("../middlewares/auth");

router.post("/register", UserController.register);
router.post("/login", UserController.login);
router.get("/profile",auth.checkAuth, UserController.profile);
router.get("/update",auth.checkAuth, UserController.update);
module.exports = router;
