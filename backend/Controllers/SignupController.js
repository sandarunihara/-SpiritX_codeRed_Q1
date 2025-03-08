import User from "../models/UserModel.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
  const { username, password, confirmPassword } = req.body;

  // Check if all fields are filled in
  if (!username || !password || !confirmPassword) {
    return res.status(400).json({ message: "Please fill in all fields" });
  }

  // Check if passwords match
  if (password !== confirmPassword) {
    return res.status(400).json({ message: "Passwords do not match" });
  }

  try {
    // Check if user already exists
    const userExists = await User.findOne({ username });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create a new user with the plain password (the pre-save hook will handle hashing)
    const user = new User({
      username,
      password,  // The password will be hashed by the pre('save') hook
    });

    // Save the user to the database
    await user.save();

    // Generate JWT Token
    const token = jwt.sign(
      { username: user.username, id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Respond with the user and token
    res.status(201).json({
      message: "User created successfully",
      token,
      user: { id: user._id, username: user.username },
    });
  } catch (error) {
    console.error("Registration Error:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const loginUser = async (req, res) => {
  const { username, password } = req.body;

  // Check if all fields are filled in
  if (!username || !password) {
    return res.status(400).json({ message: "Please fill in all fields" });
  }

  try {
    // Find the user in the database
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: "User does not exist" });
    }

    console.log("User found:", user); // Debugging log

    // Compare the plain password with the hashed password in the database
    const isPasswordCorrect = bcryptjs.compareSync(password, user.password);

    console.log("Password comparison result:", isPasswordCorrect); // Debugging log

    // If password is incorrect, return an error
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    console.log("Password matched!"); // Debugging log

    // Generate a JWT token for the user
    const token = jwt.sign(
      { username: user.username, id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Respond with the token and user info
    res.status(200).json({
      message: "Login successful",
      token,
      user: { id: user._id, username: user.username },
    });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};
