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

  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.json({ success: false, message: "User already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  await User.create({ name, email, password: hashedPassword });

  res.json({ success: true, message: "Registration successful" });
};
