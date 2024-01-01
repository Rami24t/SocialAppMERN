import { useContext } from "react";
import { MDBContainer } from "mdb-react-ui-kit";
import Post from "../post/Post";
import { SocialContext } from "../context/Context";
import axios from "axios";
import useSWR from "swr";
import { useNavigate } from "react-router-dom";

const Posts = () => {
  const navigate = useNavigate();
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const { state, dispatch } = useContext(SocialContext);
  const fetcher = async () => {
    try {
      const res = await axios.get(baseUrl + "/posts/list", {
        withCredentials: true,
      });
      if (res.status === 401 || res.status === 403) {
        dispatch({ type: "logout" });
        navigate("/");
      }
      if (res.data && res.data.posts) return res.data;
    } catch (error) {
      // console.log('Fetcher error',error);
      if (error.response.data.error === "Session expired, please login again") {
        dispatch({ type: "logout" });
        navigate("/");
        return;
      } else if (
        error.response.status === 401 ||
        error.response.status === 403
      ) {
        setTimeout(() => fetcher(), 1000);
      }
    }
  };
  const { data, error, isLoading } = useSWR(baseUrl + "/posts/list", fetcher, {
    refreshInterval: 2000,
  });

  const deletePost = async (id) => {
    // console.log("deletePost id:", id)
    try {
      const res = await axios.delete(baseUrl + "/posts/delete/" + id, {
        withCredentials: true,
      });
      // console.log("deletePost res:", res)
      return res.data;
    } catch (err) {
      console.log("deletePost err:", err.message);
    }
  };
  const updatePost = async (id, formData) => {
    console.log("updatePost", id, formData);
    try {
      const res = await axios.put(`${baseUrl}/posts/update/${id}`, formData, {
        Headers: { "content-type": "multipart/form-data" },
        withCredentials: true,
      });
      // console.log(res);
      return res.data;
    } catch (err) {
      // if (error.message.startsWith("Session expired")) {
      //   alert("Session expired, please login again");
      //   dispatch({ type: "logout" });
      //   navigate("/");
      //  else if (res.status === 401) {
      //   dispatch({ type: "logout" });
      //   navigate("/");
      // }
      console.log("updatePost err:", err.message);
    }
  };

  const toggleLike = async (id) => {
    try {
      const res = await axios.patch(
        baseUrl + "/posts/like/" + id,
        {},
        { withCredentials: true }
      );
      return res.data.liked;
    } catch (err) {
      console.log("toggleLike err:", err.message);
    }
  };

  const addComment = async (comment, postId) => {
    if (!comment) return;
    try {
      // const res =
      await axios.post(
        baseUrl + "/posts/comment/" + postId,
        { comment },
        { withCredentials: true }
      );
      // console.log(res.data);
    } catch (err) {
      console.log("addComment err:", err.message);
    }
  };

  if (error) return <div>Error...{error}</div>;
  if (isLoading) return <div>Loading...</div>;
  return (
    <section
      style={{ maxWidth: "1600px", columns: "400px 2" }}
      className="mx-auto"
    >
      <MDBContainer>
        {data?.posts &&
          data?.posts?.map((post) => (
            <Post
              key={post._id || Math.random() * 100000000}
              toggleLike={() => toggleLike(post._id)}
              addComment={addComment}
              ownPost={post.author?._id === state.user?._id}
              liked={post.likes?.includes(state.user?._id)}
              post={post}
              dispatch={dispatch}
              deletePost={deletePost}
              updatePost={updatePost}
            />
          ))}
      </MDBContainer>
    </section>
  );
};

export default Posts;
