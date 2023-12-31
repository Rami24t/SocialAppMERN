import { useState } from "react";
import PostCard from "../../components/postCard/PostCard";
import EditPostForm from "../../components/postFormModal/PostFormModal";

const Post = ({
  post,
  dispatch,
  updatePost,
  deletePost,
  ownPost,
  liked,
  toggleLike,
  addComment,
}) => {
  const [showEdit, setShowEdit] = useState(false);
  return (
    <>
      <PostCard
        addComment={addComment}
        toggleLike={toggleLike}
        liked={liked}
        ownPost={ownPost}
        post={post}
        dispatch={dispatch}
        editPost={() => setShowEdit(true)}
        deletePost={() => deletePost(post._id)}
      />
      {ownPost ? (
        <EditPostForm
          avatar={post.author?.profileImage || null}
          heading={
            post.author?.name ||
            post.author?.username ||
            post.author.email ||
            "Anonymous"
          }
          show={showEdit}
          setShow={setShowEdit}
          toggleShow={() => setShowEdit(false)}
          oldPost={{ ...post, author: post.author._id }}
          updatePost={updatePost}
        />
      ) : null}
    </>
  );
};

export default Post;
