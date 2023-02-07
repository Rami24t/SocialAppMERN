import React from 'react'
import PostCard from '../../components/postCard/PostCard'

const post = ({post, dispatch, editPost, deletePost}) => {
  return (
    <PostCard post={post} dispatch={dispatch} editPost={editPost} deletePost={()=>deletePost(post._id)}/>
  )
}

export default post