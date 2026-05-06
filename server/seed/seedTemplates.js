require("dotenv").config();

const mongoose = require("mongoose");
const Template = require("../models/Template");

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// Images live in client/public/images/ — served by Vite at /images/...
// Categories match CATEGORIES in Templates.jsx:
// ['All', 'Landing Page', 'Dashboard', 'E-Commerce', 'Portfolio', 'Blog', 'SaaS']

const templates = [
  // ── Blog ───────────────────────────────────────────────────
  {
    name: "Blog Modern",
    description: "Clean modern blog layout with featured posts and sidebar navigation.",
    thumbnail_url: "/images/blog 1.webp",
    category: "Blog",
  },
  {
    name: "Blog Magazine",
    description: "Magazine-style blog with multi-column layout and category filters.",
    thumbnail_url: "/images/blog 2.png",
    category: "Blog",
  },

  // ── Dashboard ──────────────────────────────────────────────
  {
    name: "Dashboard Minimal",
    description: "Minimal admin dashboard with KPI cards and data charts.",
    thumbnail_url: "/images/db 1.png",
    category: "Dashboard",
  },
  {
    name: "Dashboard Pro",
    description: "Full-featured admin panel with sidebar, tables, and analytics.",
    thumbnail_url: "/images/db 3.png",
    category: "Dashboard",
  },
  {
    name: "Dashboard Analytics",
    description: "Analytics-focused dashboard with real-time graphs and reports.",
    thumbnail_url: "/images/db 4.png",
    category: "Dashboard",
  },

  // ── E-Commerce ─────────────────────────────────────────────
  {
    name: "E-Commerce Store",
    description: "Full online store with product grid, cart, and checkout flow.",
    thumbnail_url: "/images/e-com.png",
    category: "E-Commerce",
  },
  {
    name: "E-Commerce Boutique",
    description: "Boutique shopping experience with animated product cards.",
    thumbnail_url: "/images/e-com 2.avif",
    category: "E-Commerce",
  },

  // ── Landing Page ───────────────────────────────────────────
  {
    name: "Landing – Startup",
    description: "High-converting startup landing page with hero, features, and CTA.",
    thumbnail_url: "/images/landing 1.jpg",
    category: "Landing Page",
  },
  {
    name: "Landing – SaaS",
    description: "SaaS product landing page with pricing table and testimonials.",
    thumbnail_url: "/images/landing 2.jpg",
    category: "Landing Page",
  },
  {
    name: "Landing – Agency",
    description: "Creative agency landing page with parallax and animated sections.",
    thumbnail_url: "/images/landing 3.avif",
    category: "Landing Page",
  },

  // ── Portfolio ──────────────────────────────────────────────
  {
    name: "Portfolio Classic",
    description: "Personal portfolio with project gallery, skills, and contact form.",
    thumbnail_url: "/images/portfolio.png",
    category: "Portfolio",
  },
];

const seedTemplates = async () => {
  try {
    await Template.deleteMany();
    await Template.insertMany(templates);
    console.log(`✅ ${templates.length} templates seeded successfully`);
    process.exit();
  } catch (error) {
    console.error("❌ Seed error:", error);
    process.exit(1);
  }
};

seedTemplates();