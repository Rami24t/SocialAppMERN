import React, { useContext } from "react";
import { Comment, Header } from "semantic-ui-react";
import CommentComponent from "../comment/Comment";
import axios from "axios";
import { SocialContext } from "../context/Context";

const CommentExampleThreaded = ({ comments }) => {
  const baseUrl = process.env.REACT_APP_BASE_URL;

  const toggleLike = async (id) => {
    try {
      const res = await axios.patch(
        baseUrl + "/comment/like/" + id,
        {},
        { withCredentials: true }
      );
      // console.log("toggleLike res:", res.data);
      return { likes: res.data.likes, liked: res.data.liked };
    } catch (err) {
      console.log("toggleLike err:", err.message);
    }
  };

  const { state, dispatch } = useContext(SocialContext);

  const createReply = async (reply, commentId) => {
    if (!reply) return false;
    try {
      const res = await axios.post(
        baseUrl + "/comment/reply/" + commentId,
        { text: reply },
        { withCredentials: true }
      );
      // console.log("createReply res:", res.data);
      return res.data.comments;
    } catch (err) {
      console.log("createReply err:", err.message);
    }
  };

  const deleteComment = async (id) => {
    if (!id) return;
    try {
      const res = await axios.delete(baseUrl + "/comment/" + id, {
        withCredentials: true,
      });
      console.log("deleteComment res:", res.data);
      return res.data.success;
    } catch (err) {
      console.log("deleteComment err:", err.message);
    }
  };

  return (
    <Comment.Group threaded>
      <Header as="h3" dividing>
        Comments
      </Header>
      {comments?.map((comment, index) => {
        return (
          <CommentComponent
            key={comment?._id || index}
            comment={comment}
            toggleLike={toggleLike}
            createReply={createReply}
            deleteComment={deleteComment}
            src={state.user.profileImage}
            name={state.user.name}
            dispatch={dispatch}
            uid={state.user._id}
          />
        );
      })}
    </Comment.Group>
  );
};
export default CommentExampleThreaded;

/*<Comment>
        <Comment.Avatar
          as="a"
          src="https://react.semantic-ui.com/images/avatar/small/matt.jpg"
        />
        <Comment.Content>
          <Comment.Author as="a">Matt</Comment.Author>
          <Comment.Metadata>
            <span>Today at 5:42PM</span>
          </Comment.Metadata>
          <Comment.Text>How artistic!</Comment.Text>
          <Comment.Actions>
            <a>12 Likes</a>
            <a>Reply</a>
          </Comment.Actions>
        </Comment.Content>
      </Comment>

       <Comment> 
       <Comment.Avatar
          as="a"
          src="https://react.semantic-ui.com/images/avatar/small/elliot.jpg"
        />
       <Comment.Content>
          <Comment.Author as="a">Elliot Fu</Comment.Author>
          <Comment.Metadata>
            <span>Yesterday at 12:30AM</span>
          </Comment.Metadata>
          <Comment.Text>
            <p>This has been very useful for my research. Thanks as well!</p>
          </Comment.Text>
          <Comment.Actions>
            <a>Like</a>
            <a>Reply</a>
          </Comment.Actions>
        </Comment.Content>

       <Comment.Group>
          <Comment>
            <Comment.Avatar
              as="a"
              src="https://react.semantic-ui.com/images/avatar/small/jenny.jpg"
            />
            <Comment.Content>
              <Comment.Author as="a">Jenny Hess</Comment.Author>
              <Comment.Metadata>
                <span>Just now</span>
              </Comment.Metadata>
              <Comment.Text>Elliot you are always so right :)</Comment.Text>
              <Comment.Actions>
                <a>Like</a>
                <a>Reply</a>
              </Comment.Actions>
            </Comment.Content>

            <Comment.Group>
              <Comment>
                <Comment.Avatar
                  as="a"
                  src="https://react.semantic-ui.com/images/avatar/small/jenny.jpg"
                />
                <Comment.Content>
                  <Comment.Author as="a">Jenny Hess</Comment.Author>
                  <Comment.Metadata>
                    <span>Just now</span>
                  </Comment.Metadata>
                  <Comment.Text>Elliot you are always so right :)</Comment.Text>
                  <Comment.Actions>
                    <a>Like</a>
                    <a>Reply</a>
                  </Comment.Actions>
                </Comment.Content>
              </Comment>
            </Comment.Group>
          </Comment>
        </Comment.Group>
      </Comment>

      <Comment>
        <Comment.Avatar
          as="a"
          src="https://react.semantic-ui.com/images/avatar/small/joe.jpg"
        />
        <Comment.Content>
          <Comment.Author as="a">Joe Henderson</Comment.Author>
          <Comment.Metadata>
            <span>5 days ago</span>
          </Comment.Metadata>
          <Comment.Text>Dude, this is awesome. Thanks so much</Comment.Text>
          <Comment.Actions>
            <a>Like</a>
            <a>Reply</a>
          </Comment.Actions>
        </Comment.Content>
      </Comment> */
