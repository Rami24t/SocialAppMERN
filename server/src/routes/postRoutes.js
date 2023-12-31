import express from "express";
import {
  list,
  add,
  updatePost,
  deletePost,
  like,
} from "../controllers/postController.js";
import {
  addComment,
  deleteComment,
  updateComment,
} from "../controllers/commentController.js";
import multerMiddleware from "../config/multer-cloudinary.js";
import auth from "../middleware/auth.js";
const router = express.Router();

// Main Posts
router.post("/add", auth, multerMiddleware.single("image"), add);
router.get("/list", auth, list);
router.put(
  "/update/:postId",
  auth,
  multerMiddleware.single("image"),
  updatePost
);
router.patch("/like/:postId", auth, like);
router.delete("/delete/:postId", auth, deletePost);

// Comments
router.post("/comment/:postId", auth, addComment);
router.patch("/comment/update", auth, updateComment);
router.delete("/comment/delete/:postId/:commentId", auth, deleteComment);

export default router;
