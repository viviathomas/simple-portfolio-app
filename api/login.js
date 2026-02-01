const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

let isConnected = false;

async function connectDB() {
  if (isConnected) return;
  await mongoose.connect(process.env.MONGODB_URI);
  isConnected = true;
}

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  await connectDB();

  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.json({ success: false, message: "Invalid credentials" });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.json({ success: false, message: "Invalid credentials" });
  }

  res.json({
    success: true,
    message: "Login successful",
    name: user.name,
    email: user.email
  });
};
