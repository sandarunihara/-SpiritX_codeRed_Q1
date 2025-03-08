import User from "../models/UserModel.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
  const { username, password, confirmPassword } = req.body;

  if (!username || !password || !confirmPassword) {
    return res.status(400).json({ message: "Please fill in all fields" });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({ message: "Passwords do not match" });
  }

  try {
    const userExists = await User.findOne({ username });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = new User({
      username,
      password,
    });

    await user.save();

    const token = jwt.sign(
      { username: user.username, id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );

    res.status(201).json({
      message: "User created successfully",
      token,
      user: { id: user._id, username: user.username },
      success: true,
      error: false,
    });
  } catch (error) {
    console.error("Registration Error:", error);
    res.status(500).json({
      message: "Something went wrong",
      success: false,
      error: true,
    });
  }
};

export const loginUser = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Please fill in all fields" });
  }

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: "User does not exist" });
    }

    console.log("User found:", user);

    const isPasswordCorrect = bcryptjs.compareSync(password, user.password);

    console.log("Password comparison result:", isPasswordCorrect);

    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    console.log("Password matched!");

    const token = jwt.sign(
      { username: user.username, id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      user: user,
      success: true,
      error: false,
    });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({
      message: "Something went wrong",
      success: false,
      error: true,
    });
  }
};
