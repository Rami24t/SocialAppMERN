import React, { useState, useRef, useEffect } from "react";
import { Comment } from "semantic-ui-react";
import { DateTime } from "luxon";
import { Form, Button, Ref } from "semantic-ui-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CommentComponent = ({
  comment,
  toggleLike,
  liked,
  createReply,
  src,
  name,
  dispatch,
  uid,
}) => {
  const [level3Comment, setLevel3Comment] = useState(comment);
  const [author, setAuthor] = useState(comment?.author);
  const setReplyAuthor = async (id) => {
    try {
      const popAuthor = await getReplyAuthor(id);
      setAuthor(popAuthor);
      comment.author = popAuthor;
    } catch (err) {
      console.log("setReplyAuthor err:", err.message);
    }
  };
  const getReplyAuthor = async (id) => {
    if(typeof id !== "string") return id
    try {
      const res = await axios
        .get(process.env.REACT_APP_BASE_URL + "/users/public/" + id, {
          withCredentials: true,
        })
  //      console.log('response of getReplyAuthor', res.data.user);
      return res.data.user;
    }
    catch (err) {
      console.log("getReplyAuthor err:", err.message);
      return id
    }
  };

  const setLevel3Reply = async (id) => {
    try {
      const popReply = await getLevel3Reply(id);
      setLevel3Comment({...popReply, Level3: true });
      comment = ({...popReply, Level3: true });
    } catch (err) {
      console.log("setReplyAuthor err:", err.message);
    }
  };
  const getLevel3Reply = async (id) => {
    if(typeof id !== "string") return id
    try {
      const res = await axios
        .get(process.env.REACT_APP_BASE_URL + "/comment/" + id, {
          withCredentials: true,
        })
      return res.data.comment;
    }
    catch (err) {
      console.log("getLevel3Comment err:", err.message);
      return id
    }
  };


  useEffect(() => {
    if(typeof comment === "string") {
      setLevel3Reply(comment);
    }
    else if (typeof comment.author === "string") {
      setReplyAuthor(comment.author);
    }
    else {
      setLevel3Comment({...comment});
      setAuthor({...comment.author});
    }
  }, []);


  const navigate = useNavigate();
  const [shownLocal, setShownLocal] = React.useState(false);
  const [reply, setReply] = useState("");
  const mainRef = useRef(null);

  const toggleReply = () => {
    console.log(mainRef?.current?.firstChild);
    setShownLocal(!shownLocal);
    if (shownLocal) {
      setReply("");
      return;
    } else
      setTimeout(() => {
        // mainRef?.current?.scrollIntoView({ behavior: "smooth" });
        mainRef?.current?.firstChild?.focus();
      }, 100);
  };

  const relDay =
    DateTime.fromISO(level3Comment?.updatedAt).toRelativeCalendar() || "just now";
  const time =
    relDay[0].toLocaleUpperCase() +
    relDay.slice(1) +
    ", on " +
    DateTime.fromISO(level3Comment?.updatedAt).toLocaleString(
      DateTime.DATETIME_MED_WITH_WEEKDAY
    );
 
    return (
    <Comment>
      <img
        as="a"
        src={
          level3Comment?.author?.profileImage || author?.profileImage ||
          "https://react.semantic-ui.com/images/avatar/small/matt.jpg"
        }
        alt="avatar"
        style={{ width: "36px", height: "36px" }}
        className="ui avatar image object-cover rounded-full"
        onClick={() => {
          dispatch({ type: "setViewProfile", payload: level3Comment?.author || author });
          navigate("/view-profile/" + level3Comment?.author?._id?.toString() || author?._id?.toString());
        }}
      />
      <Comment.Content>
        <Comment.Author
          onClick={() => {
            dispatch({ type: "setViewProfile", payload: level3Comment?.author || author  });
            navigate("/view-profile/" + level3Comment?.author?._id?.toString() || author?._id?.toString());
          }}
          as="a"
        >
          {level3Comment?.author?.name || author?.name}
        </Comment.Author>
        <Comment.Metadata>
          <span>{level3Comment?.updatedAt && time}</span>
        </Comment.Metadata>
        <Comment.Text>{level3Comment?.text}</Comment.Text>
        <Comment.Actions>
          <a
            href="#like"
            className={liked && "text-primary"}
            onClick={() => {
              toggleLike(level3Comment._id);
            }}
          >
            {level3Comment?.likes?.length || ""} Like
            {level3Comment?.likes?.length > 1 ? "s" : ""}
          </a>
          {!comment?.Level3 && !level3Comment?.Level3 &&
          <a
            href="#reply"
            onClick={() => {
              setShownLocal(!shownLocal);
              toggleReply(level3Comment?._id);
            }}
          >
            Reply
          </a>
          }
        </Comment.Actions>
      </Comment.Content>
      {level3Comment?.comments?.length > 0 || shownLocal ? (
        <Comment.Group
          onBlur={() =>
            setTimeout(
            () => {
            setReply("");
            setShownLocal(false);
            },400)
          }
        >
          {level3Comment?.comments &&
            level3Comment?.comments?.map((comment2) => (
              <CommentComponent
                key={comment2?._id}
                comment={comment2}
                toggleLike={toggleLike}
                liked={comment2?.likes?.includes(uid)}
                createReply={createReply}
                src={src}
                name={name}
                dispatch={dispatch}
              />
            ))}
          {shownLocal && (
            <Comment>
              <img
                as="a"
                alt="avatar"
                style={{ width: "36px", height: "36px" }}
                className="ui avatar image object-cover rounded-full"
                src={
                  src ||
                  "https://react.semantic-ui.com/images/avatar/small/jenny.jpg"
                }
              />
              <Comment.Content>
                <Comment.Author as="a">{name || "Name"}</Comment.Author>
                <Comment.Metadata>
                  <span>Just now</span>
                </Comment.Metadata>
                <Comment.Text>
                  <Form reply>
                    <Ref innerRef={mainRef}>
                      <Form.TextArea
                        rows={2}
                        name="reply"
                        value={reply}
                        onChange={(e) => setReply(e.currentTarget.value)}
                        placeholder="My reply"
                        className="w-full h-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent text-sm transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                        style={{ height: "max-content" }}
                      />
                    </Ref>
                    <Button
                      size="tiny"
                      onClick={() => {
                        setReply("");
                        createReply(reply, level3Comment._id);
                      }}
                      content="Add Reply"
                      labelPosition="left"
                      icon="edit"
                      primary
                    />
                  </Form>
                </Comment.Text>
              </Comment.Content>
            </Comment>
          )}
        </Comment.Group>
      ) : null}
    </Comment>
  );
};

export default CommentComponent;
