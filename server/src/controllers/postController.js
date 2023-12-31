import Post from "../models/Post.js";

export const add = async (req, res) => {
  try {
    // console.log("req body:", req.body)
    req.body.author = req.user;
    if (req.file) req.body.postImage = req.file.path;
    const post = await Post.create(req.body);
    // .populate({path: 'author', select: 'username email profileImage'})
    res.send({ success: true, post });
  } catch (error) {
    console.log("add error:", error.message);
    res.send({ success: false, error: error.message });
  }
};

export const list = async (req, res) => {
  try {
    const posts = await Post.find()
      .select("-__v")
      .populate({
        path: "author",
        select:
          "name username email gitHubId verified profileImage likes about phone title facebook github twitter instagram",
      }) // post author
      .populate({
        path: "comments",
        populate: {
          path: "author comments",
          select:
            "name profileImage verified email text author updatedAt comments",
          //                        , populate: {path: 'author', select: 'name profileImage email'}
        },
      })
      // .populate({path: 'likes', select: 'username email profileImage', options: {sort: {createdAt: -1}} }) // post likes
      // .populate({path: 'comments', select: '-__v', options: {sort: {createdAt: -1}} })// post comments
      // .populate({path: 'comments.author', select: 'username email profileImage'}) // comment author
      // .populate({path: 'comments.likes', select: 'username email profileImage', options: {sort: {createdAt: -1}} }) // comment likes
      // .populate({path: 'comments.comments', select: '-__v', options: {sort: {createdAt: -1}} }) // comment comments
      // .populate({path: 'comments.comments.author', select: 'username email profileImage'}) // comment comments author
      // .populate({path: 'comments.comments.likes', select: 'username email profileImage', options: {sort: {createdAt: -1}} }) // comment comments likes
      // .populate({path: 'comments.comments.comments' , select: '-__v', options: {sort: {createdAt: -1}} }) // comment comments comments
      // .populate({path: 'comments.comments.comments.author', select: 'username email profileImage'}) // comment comments comments author
      // .populate({path: 'comments.comments.comments.likes', select: 'username email profileImage', options: {sort: {createdAt: -1}} }) // comment comments comments likes
      .sort({ createdAt: -1 });
    res.status(200).json({ posts });
  } catch (error) {
    console.log("error:", error.message);
    res.json({ success: false, error: error.message });
  }
};

export const deletePost = async (req, res) => {
  try {
    const { postId: _id } = req.params;
    const post = await Post.findById(_id);
    const author = post.author.toString();
    if (req.user !== author)
      return res.json({ success: false, errorId: 401 }).status(401);
    else {
      await post.remove();
      res.json({ success: true, post }).status(200);
    }
  } catch (error) {
    console.log("delete post error:", error.message);
    res.json({ success: false, error: error.message }).status(500);
  }
};

export const updatePost = async (req, res) => {
  try {
    if (req.user !== req.body.author)
      return res.send({ success: false, errorId: 0 });
    if (req.file) req.body.postImage = req.file.path;

    console.log("req.body:", req.body);
    const newPost = await Post.findByIdAndUpdate(req.params.postId, req.body, {
      new: true,
    });
    res.send({ success: true });
  } catch (error) {
    console.log("update post error:", error.message);
    res.send({ success: false, error: error.message });
  }
};

export const like = async (req, res) => {
  try {
    let liked = null;
    let post = await Post.findById(req.params.postId);
    // console.log(post, 'post')
    if (post?.likes?.includes(req.user)) {
      // is in the likes array?
      post = await Post.findByIdAndUpdate(
        req.params.postId,
        {
          $pull: {
            // deletes matching items
            likes: req.user,
          },
        },
        { new: true }
      );
      liked = true;
    } else {
      post = await Post.findByIdAndUpdate(
        req.params.postId,
        {
          $addToSet: {
            likes: req.user,
          },
        },
        { new: true }
      );
      liked = false;
    }
    res.json({ success: true, likes: post.likes, liked }).status(200);
  } catch (error) {
    console.log("like error:", error.message);
    res.json({ success: false, error: error.message }).status(500);
  }
};
