import React from 'react'
import PostCard from '../../components/postCard/PostCard'

const post = ({post, dispatch, editPost, deletePost, ownPost, liked, toggleLike}) => {
  return (
    <PostCard toggleLike={toggleLike} liked={liked} ownPost={ownPost} post={post} dispatch={dispatch} editPost={editPost} deletePost={()=>deletePost(post._id)}/>
  )
}

export default post