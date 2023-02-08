import React from 'react'
import PostCard from '../../components/postCard/PostCard'

const post = ({post, dispatch, editPost, deletePost, ownPost}) => {
  return (
    <PostCard ownPost={ownPost} post={post} dispatch={dispatch} editPost={editPost} deletePost={()=>deletePost(post._id)}/>
  )
}

export default post