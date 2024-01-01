import Post from "../models/Post.js";
import Comment from "../models/Comment.js";

export const addComment = async (req, res) => {
  try {
    const comment = await Comment.create({
      text: req.body.comment,
      author: req.user,
    });
    const post = await Post.findByIdAndUpdate(
      req.params.postId,
      {
        $push: {
          comments: comment,
        },
      },
      { new: true }
    ).populate({
      path: "comments",
      populate: { path: "author", select: "username profileImage email" },
    });
    res.json({ success: true, comments: post.comments }).status(200);
  } catch (error) {
    console.log("add error:", error.message);
    res.json({ success: false, error: error.message }).status(500);
  }
};

export const getCommentLikes = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment)
      return res
        .json({ success: false, error: "Comment not found" })
        .status(404);
    res.json({ success: true, likes: comment.likes }).status(200);
  } catch (error) {
    console.log("getCommentLikes error:", error.message);
    res.json({ success: false, error: error.message }).status(500);
  }
};

export const reply = async (req, res) => {
  try {
    const reply = await Comment.create({
      text: req.body.text,
      author: req.user,
    });
    const comment = await Comment.findByIdAndUpdate(
      req.params.id,
      {
        $push: {
          comments: reply,
        },
      },
      { new: true }
    ).populate({
      path: "comments",
      populate: { path: "author", select: "name username profileImage email" },
    });
    res.json({ success: true, comments: comment.comments }).status(200);
  } catch (error) {
    console.log("reply error:", error.message);
    res.json({ success: false, error: error.message }).status(500);
  }
};

export const getComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id).populate({
      path: "author",
      select: "name profileImage email",
    });
    res.json({ success: true, comment }).status(200);
  } catch (error) {
    console.log("getComment error:", error.message);
    res.json({ success: false, error: error.message }).status(500);
  }
};

export const likeComment = async (req, res) => {
  try {
    let liked = null;
    let comment = await Comment.findById(req.params.id);
    if (comment?.likes?.includes(req.user)) {
      // is in the likes array?
      comment = await Comment.findByIdAndUpdate(
        req.params.id,
        {
          $pull: {
            // deletes matching items
            likes: req.user,
          },
        },
        { new: true }
      );
      liked = false;
    } else {
      comment = await Comment.findByIdAndUpdate(
        req.params.id,
        {
          $addToSet: {
            likes: req.user,
          },
        },
        { new: true }
      );
      liked = true;
    }
    res.json({ success: true, likes: comment.likes, liked }).status(200);
  } catch (error) {
    console.log("like error:", error.message);
    res.json({ success: false, error: error.message }).status(500);
  }
};

export const deleteComment = async (req, res) => {
  try {
    // const post = await Post.findByIdAndUpdate(
    //   req.params.postId,
    //   {
    //     $pull: {
    //       comments: {
    //         _id: req.params.commentId,
    //       },
    //     },
    //   },
    //   { new: true }
    // ).populate({ path: "comments.author", select: "username image email" });
    // res.send({ success: true, comments: post.comments });

    const comment = await Comment.findOneAndDelete({
      author: req.user,
      _id: req.params.commentId,
    });
    res.json({ success: true, comment }).status(200);
  } catch (error) {
    console.log("deleteComment error:", error.message);
    res.send({ success: false, error: error.message });
  }
};

export const updateComment = async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(
      req.body.postId,
      {
        $set: {
          "comments.$[elem].comment": req.body.comment,
        },
      },
      {
        arrayFilters: [{ "elem._id": req.body.commentId }],
        new: true,
      }
    ).populate({ path: "comments.author", select: "username image email" });
    // console.log("updateComment ~ post:", post);
    res.send({ success: true, comments: post.comments });
  } catch (error) {
    console.log("updateComment ~ error:", error.message);
    res.send({ success: false, error: error.message });
  }
};

export const updateCommentJS = async (req, res) => {
  try {
    const post = await Post.findById(req.body.postId);
    const commentIdx = post.comments.findIndex(
      (item) => item._id.toString() === req.body.commentId
    );
    post.comments[commentIdx].comment = req.body.comment;
    const newPost = await Post.findByIdAndUpdate(
      req.body.postId,
      {
        comments: post.comments,
      },
      {
        new: true,
      }
    ).populate({ path: "comments.author", select: "username image email" });
    // console.log("updateCommentJS ~ post", commentIdx);
    res.send({ success: true, comments: newPost.comments });
  } catch (error) {
    console.log("updateComment ~ error:", error.message);
    res.send({ success: false, error: error.message });
  }
};
