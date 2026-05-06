const router = require("express").Router();
const { register, login, getMe } = require("../controllers/authController");
const auth = require("../middleware/authMiddleware");

router.post("/register", register);
router.post("/login", login);
// FIX: added /me route so AuthContext can verify token on page refresh
router.get("/me", auth, getMe);

module.exports = router;
