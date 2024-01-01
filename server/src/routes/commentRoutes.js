import express from "express";
// import multerMiddleware from '../config/multer-cloudinary.js'
import auth from "../middleware/auth.js";
const router = express.Router();
import {
  getCommentLikes,
  getComment,
  likeComment,
  reply,
  deleteComment,
} from "../controllers/commentController.js";

router.patch("/like/:id", auth, likeComment);
router.post("/reply/:id", auth, reply);
router.get("/:id", auth, getComment);
router.get("/likes/:id", auth, getCommentLikes);
router.delete("/:commentId", auth, deleteComment);

export default router;
