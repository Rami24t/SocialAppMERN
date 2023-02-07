import React, {useContext} from 'react'
import { MDBContainer } from 'mdb-react-ui-kit'
import Post from '../post/Post'
import { SocialContext } from '../context/Context'
import axios from 'axios'
import useSWR from 'swr'

const Posts = () => {
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const {state, dispatch} = useContext(SocialContext)
  const fetcher = async () => {
    const res = await axios.get(baseUrl+'/posts/list', { withCredentials: true })
    return res.data
  }
  const { data, error, isLoading } = useSWR(baseUrl+'/posts/list', fetcher, { refreshInterval: 1000 })
  if (error) return <div>Error...</div>
  if (isLoading) return <div>Loading...</div>
  return (
    <MDBContainer>
      {
        data?.posts?.map(post => (
        <Post key={post?._id} post={post} dispatch={dispatch} />
        ))
      }
      <Post />
    </MDBContainer>
  )
}

export default Posts