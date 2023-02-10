import React, { useState, useRef } from "react";
import { Comment } from "semantic-ui-react";
import { DateTime } from "luxon";
import { Form, Button, Ref } from "semantic-ui-react";
import { useNavigate } from "react-router-dom";

const CommentComponent = ({
  comment,
  toggleLike,
  liked,
  createReply,
  src,
  name,
  dispatch,
}) => {
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

  const relDay = DateTime.fromISO(comment?.updatedAt).toRelativeCalendar();
  const time = relDay[0].toLocaleUpperCase() + relDay.slice(1) +", on "+DateTime.fromISO(comment?.updatedAt).toLocaleString(DateTime.DATETIME_MED_WITH_WEEKDAY)

  return (
    <Comment>
      <img
        as="a"
        src={
          comment?.author?.profileImage ||
          "https://react.semantic-ui.com/images/avatar/small/matt.jpg"
        }
        alt="avatar"
        style={{ width: "36px", height: "36px" }}
        className="ui avatar image object-cover rounded-full"
        onClick={() => {
          dispatch({ type: "setViewProfile", payload: comment?.author });
          navigate("/view-profile/" + comment?.author?._id?.toString());
        }}
      />
      <Comment.Content>
        <Comment.Author
          onClick={() => {
            dispatch({ type: "setViewProfile", payload: comment?.author });
            navigate("/view-profile/" + comment?.author?._id?.toString());
          }}
          as="a"
        >
          {comment?.author?.name}
        </Comment.Author>
        <Comment.Metadata>
          <span>
            {comment?.updatedAt && time}
          </span>
        </Comment.Metadata>
        <Comment.Text>{comment?.text}</Comment.Text>
        <Comment.Actions>
          <a
            href="#like"
            className={liked && "text-primary"}
            onClick={() => {
              toggleLike(comment._id);
            }}
          >
            {comment?.likes?.length || ""} Like
            {comment?.likes.length > 1 ? "s" : ""}
          </a>
          <a
            href="#reply"
            onClick={() => {
              setShownLocal(!shownLocal);
              toggleReply(comment?._id);
            }}
          >
            Reply
          </a>
        </Comment.Actions>
      </Comment.Content>
      {shownLocal && (
        <Comment.Group
          onBlur={() => {
            setReply("");
            setShownLocal(false);
          }}
        >
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
                    onClick={() => {
                      setReply("");
                      createReply(reply, comment._id);
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
        </Comment.Group>
      )}
    </Comment>
  );
};

export default CommentComponent;
