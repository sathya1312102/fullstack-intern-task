const Template = require("../models/Template");

exports.getTemplates = async (req, res) => {
  try {
    const { search, category } = req.query;
    const filter = {};

    // FIX: support search by name/description (case-insensitive)
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    // FIX: support category filter
    if (category && category !== "All") {
      filter.category = category;
    }

    const templates = await Template.find(filter);
    res.json({ data: templates });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.getTemplateById = async (req, res) => {
  try {
    const template = await Template.findById(req.params.id);
    if (!template) {
      return res.status(404).json({ message: "Template not found" });
    }
    res.json(template);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
