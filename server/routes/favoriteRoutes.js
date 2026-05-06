const router = require("express").Router();
const auth = require("../middleware/authMiddleware");
const {
  toggleFavorite,
  getFavorites,
  getFavoriteIds,
} = require("../controllers/favoriteController");

// FIX: /ids must come BEFORE /:templateId or Express will treat "ids" as a templateId param
router.get("/ids", auth, getFavoriteIds);
router.get("/", auth, getFavorites);
// FIX: changed addFavorite to toggleFavorite
router.post("/:templateId", auth, toggleFavorite);

module.exports = router;
