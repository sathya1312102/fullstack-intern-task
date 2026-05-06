const Favorite = require("../models/Favorite");

// FIX: toggle favorite (add if not exists, remove if exists) and return favorited status
exports.toggleFavorite = async (req, res) => {
  try {
    const existing = await Favorite.findOne({
      user: req.user.id,
      template: req.params.templateId,
    });

    if (existing) {
      await Favorite.deleteOne({ _id: existing._id });
      return res.json({ message: "Removed from favorites", favorited: false });
    }

    await Favorite.create({
      user: req.user.id,
      template: req.params.templateId,
    });

    res.json({ message: "Added to favorites", favorited: true });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Returns full favorite template objects
exports.getFavorites = async (req, res) => {
  try {
    const favorites = await Favorite.find({ user: req.user.id }).populate("template");
    // FIX: return array of template objects (not favorite wrapper)
    const templates = favorites
      .map((f) => f.template)
      .filter(Boolean);
    res.json({ data: templates });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// FIX: new endpoint — returns only templateIds for quick favorite-state lookup on Templates page
exports.getFavoriteIds = async (req, res) => {
  try {
    const favorites = await Favorite.find({ user: req.user.id }).select("template");
    const ids = favorites.map((f) => f.template.toString());
    res.json({ data: ids });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
