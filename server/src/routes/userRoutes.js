import express from "express";
import {
  getUserPublic,
  register,
  ghRegister,
  ghLogin,
  login,
  emailConfirm,
  forgotPass,
  changePass,
  logout,
  updateCover,
  updateProfile,
} from "../controllers/userController.js";
import auth from "../middleware/auth.js";
import multerMiddleware from "../config/multer-cloudinary.js";
const router = express.Router();
import { check } from "express-validator";

router.post(
  "/register",
  [
    check("username", "Username is required").notEmpty(),
    check("email", "Please include a valid email")
      .isEmail()
      .trim()
      .escape()
      .normalizeEmail(),
    check(
      "password",
      "Please enter a password with 6 or more characters"
    ).isLength({ min: 6 }),
  ],
  register
);
router.post(
  "/gh-register",
  [check("code", "code is required").notEmpty().trim()],
  ghRegister
);
router.post("/login", [check("*").notEmpty().trim().escape()], login);
router.post(
  "/gh-login",
  [check("code", "code is required").notEmpty().trim().escape()],
  ghLogin
);
router.get("/logout", logout);

router.get("/public/:id", auth, getUserPublic);

router.post("/emailconfirm", emailConfirm);
router.post("/forgotpass", forgotPass);
router.post("/changepassword", changePass);

router.put("/profile", auth, multerMiddleware.single("image"), updateProfile);
router.put("/cover", auth, multerMiddleware.single("image"), updateCover);

export default router;
