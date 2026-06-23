const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const { Holding } = require("./models/HoldingModel");
const { Position } = require("./models/PositionModel");
const { Order } = require("./models/OrderModel");
const { User } = require("./models/UserModel");

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || "zerodha_clone_super_secret_2024";

// ─── Middleware ────────────────────────────────────────────────────────────────
app.use(cors());
app.use(bodyParser.json());

// ─── DB Connection ─────────────────────────────────────────────────────────────
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB error:", err));

// ─── Auth Middleware ───────────────────────────────────────────────────────────
const authMiddleware = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }
  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.userId = decoded.userId;
    req.userName = decoded.name;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};

// ─── Demo Data Seeder ──────────────────────────────────────────────────────────
const seedDemoData = async (userId) => {
  const demoHoldings = [
    { userId, name: "INFY",    qty: 10, avg: 1420.50, price: 1583.25, net: "+11.46%", day: "+0.8%", isDown: false },
    { userId, name: "RELIANCE",qty: 5,  avg: 2380.00, price: 2912.60, net: "+22.37%", day: "+1.2%", isDown: false },
    { userId, name: "TCS",     qty: 8,  avg: 3540.00, price: 3290.80, net: "-7.04%",  day: "-0.5%", isDown: true  },
    { userId, name: "HDFCBANK",qty: 15, avg: 1610.00, price: 1724.45, net: "+7.11%",  day: "+0.4%", isDown: false },
    { userId, name: "WIPRO",   qty: 20, avg: 445.75,  price: 478.90,  net: "+7.43%",  day: "-0.3%", isDown: true  },
  ];

  const demoPositions = [
    { userId, product: "MIS", name: "NIFTY25JUNFUT", qty: 1,   avg: 24310.00, price: 24480.50, net: "+0.70%", day: "+170.50", isDown: false, isLoss: false },
    { userId, product: "CNC", name: "SUNPHARMA",     qty: 12,  avg: 1628.00,  price: 1590.30,  net: "-2.32%", day: "-37.70",  isDown: true,  isLoss: true  },
    { userId, product: "MIS", name: "BAJFINANCE",    qty: 2,   avg: 6720.00,  price: 6945.00,  net: "+3.35%", day: "+225.00", isDown: false, isLoss: false },
    { userId, product: "CNC", name: "LTIM",          qty: 6,   avg: 5200.00,  price: 5485.75,  net: "+5.49%", day: "+285.75", isDown: false, isLoss: false },
  ];

  await Holding.insertMany(demoHoldings);
  await Position.insertMany(demoPositions);
  console.log(`✅ Demo data seeded for user ${userId}`);
};

// ─── Health Check ──────────────────────────────────────────────────────────────
app.get("/", (req, res) => {
  res.json({ status: "ok", message: "Zerodha Clone API running 🚀" });
});

// ─── Auth Routes ───────────────────────────────────────────────────────────────
// Register
app.post("/auth/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "Email already registered. Please login." });
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const user = new User({ name, email, passwordHash });
    await user.save();

    // Seed demo data for the new user
    await seedDemoData(user._id);

    const token = jwt.sign(
      { userId: user._id, name: user.name, email: user.email },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(201).json({
      token,
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({ message: "Server error during registration" });
  }
});

// Login
app.post("/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign(
      { userId: user._id, name: user.name, email: user.email },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      token,
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error during login" });
  }
});

// Verify token (used by dashboard on load)
app.get("/auth/verify", authMiddleware, (req, res) => {
  res.json({ valid: true, userId: req.userId, name: req.userName });
});

// ─── Protected Data Routes ─────────────────────────────────────────────────────
// Holdings — scoped to the logged-in user
app.get("/holdings", authMiddleware, async (req, res) => {
  try {
    const holdings = await Holding.find({ userId: req.userId });
    res.json(holdings);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch holdings" });
  }
});

// Positions — scoped to the logged-in user
app.get("/positions", authMiddleware, async (req, res) => {
  try {
    const positions = await Position.find({ userId: req.userId });
    res.json(positions);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch positions" });
  }
});

// Orders — GET all orders for the user
app.get("/orders", authMiddleware, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.userId }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch orders" });
  }
});

app.post("/newOrder", authMiddleware, async (req, res) => {
  try {
    const { name, qty, price, mode } = req.body;
    const parsedQty = Number(qty);
    const parsedPrice = Number(price);

    const newOrder = new Order({
      userId: req.userId,
      name,
      qty: parsedQty,
      price: parsedPrice,
      mode,
    });
    await newOrder.save();

    const holding = await Holding.findOne({ userId: req.userId, name });

    if (mode === "BUY") {
      if (holding) {
        const totalCost = (holding.qty * holding.avg) + (parsedQty * parsedPrice);
        holding.qty += parsedQty;
        holding.avg = totalCost / holding.qty;
        holding.price = parsedPrice; 
        await holding.save();
      } else {
        const newHolding = new Holding({
          userId: req.userId,
          name,
          qty: parsedQty,
          avg: parsedPrice,
          price: parsedPrice,
          net: "+0.00%",
          day: "+0.00%",
          isDown: false
        });
        await newHolding.save();
      }
    } else if (mode === "SELL") {
      if (holding) {
        if (holding.qty > parsedQty) {
          holding.qty -= parsedQty;
          holding.price = parsedPrice;
          await holding.save();
        } else {
          await Holding.deleteOne({ _id: holding._id });
        }
      }
    }

    res.status(201).json({ message: "Order placed successfully!", order: newOrder });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to place order" });
  }
});

// ─── Start Server ──────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`🚀 Server listening on port ${PORT}`);
});
