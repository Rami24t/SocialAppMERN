import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
// import sendEmail from "../utilities/email.js";
import { validationResult } from "express-validator";

const SALT_ROUNDS = 10;
export const register = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const salt = await bcrypt.genSalt(SALT_ROUNDS);
    const hashedPass = await bcrypt.hash(req.body.password, salt);
    req.body.password = hashedPass;
    const user = await User.create(req.body);
    console.log("register user: ", user);
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    // sendEmail(token);
    res.json({ success: true });
  } catch (error) {
    console.log("registration error:", error.message);
    res.json({ success: false, error: error });
  }
};

export const login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const user = await User.findOne({
      $or: [
        { username: req.body.emailOrUsername },
        {
          email: req.body.emailOrUsername,
        },
      ],
    }).select("-__v");

    // console.log("logging in user:", user);
    if (!user) return res.status(404).json({ success: false, errorId: 404 });
    const passMatch = await bcrypt.compare(req.body.password, user.password);
    if (!passMatch)
      return res.status(401).json({ success: false, errorId: 401 });
    const newUser = user.toObject();
    delete newUser.password;
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.cookie("SocialAppMERNToken", token, { sameSite: "none", secure: true });
    res.send({ success: true, user: newUser });
  } catch (error) {
    console.log("login error:", error.message);
    res.send({ success: false, error: error.message });
  }
};

export const emailConfirm = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const token = req.body.token;
    const decrypted = jwt.verify(token, process.env.JWT);
    console.log("emailConfirm ~ decrypted", decrypted);
    const user = await User.findByIdAndUpdate(
      { _id: decrypted.id },
      { verified: true },
      { new: true }
    );
    console.log("emailConfirm ~ user", user);
    res.send({ success: true });
  } catch (error) {
    console.log("emailConfirm error:", error.message);
    res.send({ success: false, error: error.message });
  }
};

export const forgotPass = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const user = await User.findOne({
      $or: [
        { username: req.body.emailOrUsername },
        { email: req.body.emailOrUsername },
      ],
    });
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    sendEmail(token, "forgotpass");
    res.send({ success: true });
  } catch (error) {
    console.log("forgotPass error:", error.message);
    res.send({ success: false, error: error.message });
  }
};

export const changePass = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const decrypted = jwt.verify(req.body.token, process.env.JWT_SECRET);
    const salt = await bcrypt.genSalt(SALT_ROUNDS);
    const hashedPass = await bcrypt.hash(req.body.password, salt);
    await User.findByIdAndUpdate(
      decrypted.id,
      { password: hashedPass },
      { new: true }
    );
    res.send({ success: true });
  } catch (error) {
    console.log("changePass error:", error.message);
    res.send({ success: false, error: error.message });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("SocialAppMERNToken", { sameSite: "none", secure: true });
    res.json({ success: true }).status(200);
  } catch (error) {
    console.log("logout error:", error.message);
    res.send({ success: false, error: error.message });
  }
};

export const getUserPublic = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const user = await User.findById(req.params.id).select("-password -__v");
    if (!user) return res.json({ success: false, errorId: 404 }).status(404);
    res.json({ success: true, user }).status(200);
  } catch (error) {
    console.log("getUser error:", error.message);
    res.json({ success: false, error: error.message }).status(500);
  }
};

export const updateProfile = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    if (req.file) req.body.profileImage = req.file.path;
    req.body.likes = JSON.parse(req.body.likes);
    const user = await User.findByIdAndUpdate(req.user, req.body, {
      new: true,
    }).select("-password -__v");
    if (!user) return res.send({ success: false, errorId: 404 });
    res.send({ success: true, user });
  } catch (error) {
    console.log("updateProfile error:", error.message);
    res.send({ success: false, error: error.message });
  }
};

export const updateCover = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    if (req.file) req.body.coverImage = req.file.path;
    const user = await User.findByIdAndUpdate(req.user, req.body, {
      new: true,
    }).select("-password -__v");
    if (!user) return res.send({ success: false, errorId: 404 });
    res.json({ success: true, coverImage: user.coverImage }).status(200);
  } catch (error) {
    console.log("updateCover error:", error.message);
    res.send({ success: false, error: error.message });
  }
};
