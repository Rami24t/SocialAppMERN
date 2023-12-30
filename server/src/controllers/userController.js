import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
// import sendEmail from "../utilities/email.js";
import sendEmail from "../utilities/sendGridMail.js";
import { validationResult } from "express-validator";

const SALT_ROUNDS = 10;
 const register = async (req, res) => {
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
    sendEmail(token);
    res.json({ success: true });
  } catch (error) {
    console.log("registration error:", error.message);
    res.json({ success: false, error: error });
  }
};

 const ghRegister = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }
    const ghQueryParamsString = `client_id=${process.env.GH_CLIENT_ID}&client_secret=${process.env.GH_CLIENT_SECRET}&code=${req.body.code}`;
    // console.log("ghQueryParamsString", ghQueryParamsString);
    const ghResponse = await fetch(
      `https://github.com/login/oauth/access_token?${ghQueryParamsString}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => data);
    await fetch("https://api.github.com/user", {
      method: "GET",
      headers: {
        Authorization: "token " + ghResponse.access_token,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // console.log("data2", data);
        req.body.username = data.login + data.id + "_gh";
        req.body.verified = true;
        req.body.gitHubId = data.id;
        data.avatar_url && (req.body.profileImage = data.avatar_url);
        data.name && (req.body.name = data.name);
        data.bio && (req.body.about = data.bio);
        data.location && (req.body.location += `; location:${data.location}`);
        if (data.email) req.body.email = data.email;
        data.html_url && (req.body.github = data.html_url);
        data.blog && (req.body.website = data.blog);
        data.twitter_username && (req.body.twitter = data.twitter_username);
      });
    const user = await User.create(req.body);
    console.log("register user: ", user);
    res.json({ success: true });
  } catch (error) {
    console.log("registration error:", error.message);
    res.json({ success: false, error: error });
  }
};

 const ghLogin = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const ghQueryParamsString =
      "client_id=" +
      process.env.GH_CLIENT_ID +
      "&client_secret=" +
      process.env.GH_CLIENT_SECRET +
      "&code=" +
      req.body.code;
    const ghResponse = await fetch(
      "https://github.com/login/oauth/access_token?" + ghQueryParamsString,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => data);
    // const hashedPass = await bcrypt.hash(ghResponse.access_token, salt);
    const username = await fetch("https://api.github.com/user", {
      method: "GET",
      headers: {
        Authorization: "token " + ghResponse.access_token,
      },
    })
      .then((response) => response.json())
      .then((data) => data.login + data.id + "_gh") // user.github = data.html_url;
      .catch((error) => {
        console.log(error);
        res.status(401).json({ success: false, error: error, errorId: 401 }); // if (!passMatch) return res.status(401).json({ success: false, errorId: 401 });
      });
    const user = await User.findOne({ username: username }).select("-__v");
    if (!user) return res.status(404).json({ success: false, errorId: 404 });
    console.log("ghLogin ~ ghResponse", ghResponse);
    console.log("logging in user._id:", user._id);

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    console.log("ghLogin token:", token);
    res.cookie("SocialAppMERNToken", token, { sameSite: "none", secure: true });
    console.log(res.cookie);
    res.json({ success: true, user: user.toObject() });
  } catch (error) {
    console.log("login error:", error.message);
    res.json({ success: false, error: error.message });
  }
};

 const login = async (req, res) => {
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

const sendVerificationLink = async (req, res) => {
  // const errors = validationResult(req);
  // if (!errors.isEmpty()) {
  //   return res.status(400).json({ errors: errors.array() });
  // }
  try {
    const decoded = jwt.decode(req.body.token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    const passMatch = await bcrypt.compare(req.body.password, user.password);
    if (!passMatch)
      return res.status(401).json({ success: false, errorId: 401 });  
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    sendEmail(token);
    res.send({ success: true });
  }
  catch (error) {
    console.log("sendVerificationLink error:", error.message);
    res.send({ success: false, error: error.message });
  }
}

 const verifyEmail = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const token = req.body.token;
    const decrypted = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findByIdAndUpdate(
      { _id: decrypted.id },
      { verified: true },
      { new: true }
    );
    console.log("verifyEmail ~ user", user);
    res.send({ success: true });
  } catch (error) {
    console.log("verifyEmail error:", error.message);
    res.json({ success: false, error: error.message });
  }
};

 const forgotPass = async (req, res) => {
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

 const changePass = async (req, res) => {
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

 const logout = async (req, res) => {
  try {
    res.clearCookie("SocialAppMERNToken", { sameSite: "none", secure: true });
    res.json({ success: true }).status(200);
  } catch (error) {
    console.log("logout error:", error.message);
    res.send({ success: false, error: error.message });
  }
};

 const getUserPublic = async (req, res) => {
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

 const updateProfile = async (req, res) => {
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

 const updateCover = async (req, res) => {
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

export {
  register,
  ghRegister,
  ghLogin,
  login,
  verifyEmail,
  sendVerificationLink,
  forgotPass,
  changePass,
  logout,
  getUserPublic,
  updateProfile,
  updateCover,
};