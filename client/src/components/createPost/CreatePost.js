import React,{ useState, useContext } from 'react';
import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
} from 'mdb-react-ui-kit';
import NewPostForm from '../NewPostForm/NewPostForm';
import { SocialContext } from '../context/Context';

export default function App( {toggleShow, staticModal, setStaticModal, addNewPost, oldPost = null, heading, avatar } ) {
  const { state } = useContext(SocialContext);
  const resetPost = {
    author: state?.user?._id,
    title: '',
    text: '',
    image: '',
  }
  const [post, setPost] = useState(oldPost? oldPost : resetPost);

  const handleInputChange = (e) => {
    if(e.target.name === 'image') {
      setPost({ ...post, image: e.currentTarget?.files[0] });
      return;
    }
    const { name, value } = e.target;
    setPost({ ...post, [name]: value });
  };
  const createPost = () => {
    if(!post.title ) return alert('Title is required for creating a new post.');
  const formData = new FormData();
  formData.set('author', post?.author)
  formData.set('title', post.title)
  formData.set('text', post.text)
  if(post?.image)
    formData.set('image', post.image)
  addNewPost(formData);
  setStaticModal(false);
  setPost(resetPost);
};

  return (
    <>
      <MDBModal staticBackdrop  tabIndex='-1' show={staticModal} setShow={setStaticModal}>
        <MDBModalDialog size="xl">
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>New Post</MDBModalTitle>
              {/* <MDBBtn className='btn-close' color='none' onClick={toggleShow}></MDBBtn> */}
            </MDBModalHeader>
            <MDBModalBody>
                <NewPostForm avatar={avatar} heading={heading} updatePost={handleInputChange} post={post} />
            </MDBModalBody>
            <MDBModalFooter>
              <MDBBtn color='secondary' onClick={toggleShow}>
                Cancel
              </MDBBtn>
              <MDBBtn onClick={createPost}>Create Post</MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
}