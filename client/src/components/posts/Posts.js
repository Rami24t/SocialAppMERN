import React, {useContext} from 'react'
import { MDBContainer } from 'mdb-react-ui-kit'
import Post from '../post/Post'
import { SocialContext } from '../context/Context'

const Posts = () => {
  const {state} = useContext(SocialContext)
  const {posts} = state

  return (
    <MDBContainer>
      <Post />
      <Post />
      <Post />
      {
        posts.map(post => (
        <Post key={post._id} post={post} />
        ))
      }
    </MDBContainer>
  )
}

export default Posts