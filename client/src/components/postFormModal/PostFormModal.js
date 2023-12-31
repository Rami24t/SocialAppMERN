import React, { useState, useContext } from "react";
import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
} from "mdb-react-ui-kit";
import PostForm from "../postForm/PostForm";
import { SocialContext } from "../context/Context";

export default function PostFormModal({
  show,
  setShow,
  addNewPost,
  oldPost = null,
  heading,
  avatar,
  updatePost,
}) {
  const hide = () => setShow(false);
  const { state } = useContext(SocialContext);
  const resetPost = {
    author: state?.user?._id,
    title: "",
    text: "",
    image: "",
  };
  const [post, setPost] = useState(oldPost ? oldPost : resetPost);

  const handleInputChange = (e) => {
    if (e.target.name === "image") {
      setPost({ ...post, image: e.currentTarget?.files[0] });
      return;
    }
    const { name, value } = e.target;
    setPost({ ...post, [name]: value });
  };
  const savePost = () => {
    if (!post.title) return alert("Title is required.");
    const formData = new FormData();
    formData.set("author", post?.author);
    formData.set("title", post.title);
    formData.set("text", post.text);
    if (post?.image) formData.set("image", post.image);
    oldPost ? updatePost(post._id, formData) : addNewPost(formData);
    hide();
    !oldPost && setPost(resetPost);
  };

  return (
    <>
      <MDBModal staticBackdrop tabIndex="-1" show={show} setShow={setShow}>
        <MDBModalDialog size="xl">
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>{!oldPost ? "New" : "Edit"} Post</MDBModalTitle>
              {/* <MDBBtn className='btn-close' color='none' onClick={></MDBBtn> */}
            </MDBModalHeader>
            <MDBModalBody>
              <PostForm
                avatar={avatar}
                heading={heading}
                updatePost={handleInputChange}
                post={post}
              />
            </MDBModalBody>
            <MDBModalFooter>
              <MDBBtn
                color="secondary"
                onClick={() => {
                  hide();
                  oldPost && setPost(oldPost);
                }}
              >
                Cancel
              </MDBBtn>
              <MDBBtn onClick={savePost}>
                {!oldPost ? "Create" : "Save"} Post
              </MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
}
