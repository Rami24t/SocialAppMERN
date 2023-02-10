import React, {useContext} from 'react'
import { MDBContainer } from 'mdb-react-ui-kit'
import Post from '../post/Post'
import { SocialContext } from '../context/Context'
import axios from 'axios'
import useSWR from 'swr'
import { useNavigate } from 'react-router-dom'

const Posts = () => {
  const navigate = useNavigate();
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const {state, dispatch} = useContext(SocialContext)
  const fetcher = async () => {
    const res = await axios.get(baseUrl+'/posts/list', { withCredentials: true })
    if(res.status === 401 || res.status === 403) {
      dispatch({type: 'logout'})
      navigate('/')
    }
    return res.data
  }
  const { data, error, isLoading } = useSWR(baseUrl+'/posts/list', fetcher, { refreshInterval: 1000 })
  if (error) return <div>Error...{error}</div>
  if (isLoading) return <div>Loading...</div>

  const deletePost = async (id) => {
    console.log("deletePost id:", id)
    try {
      const res = await axios.delete(baseUrl+'/posts/delete/'+id, { withCredentials: true })
      console.log("deletePost res:", res)
      return res.data
    }
    catch (err) {
      console.log("deletePost err:", err.message)
    }
  }
  const editPost = async (id, text) => {
    // const res = await axios.put(baseUrl+'/posts/edit/'+id, {text}, { withCredentials: true })
    // return res.data
  }

  const toggleLike = async (id) => {
    try {
      const res = await axios.patch(baseUrl+'/posts/like/'+id, {}, { withCredentials: true })
      return res.data.liked
    }
    catch (err) {
      console.log("toggleLike err:", err.message)
    }
  }

  const addComment = async (comment, postId) => {
    try {
      const res = await axios.post(baseUrl+'/posts/comment/'+postId, {comment}, { withCredentials: true })
      console.log(res.data);
    }
    catch (err) {
      console.log("addComment err:", err.message)
    }
  }


  return (
    <MDBContainer>
      {
        data?.posts?.map(post => (
        <Post toggleLike={()=>toggleLike(post._id)} addComment={addComment} key={post?._id} ownPost={post?.author._id===state.user._id} liked={post.likes.includes(state.user._id)} post={post} dispatch={dispatch} deletePost={deletePost} editPost={editPost} />
        ))
      }
    </MDBContainer>
  )
}

export default Posts