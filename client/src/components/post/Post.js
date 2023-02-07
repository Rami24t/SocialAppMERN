import React from 'react'
import PostCard from '../../components/postCard/PostCard'

const post = ({post, dispatch}) => {
  return (
    <PostCard post={post} dispatch={dispatch} />
  )
}

export default post