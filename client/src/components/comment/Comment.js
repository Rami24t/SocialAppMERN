import React, {
  useState,
  useRef,
  useCallback,
  useEffect,
  useMemo,
} from "react";
import { Comment } from "semantic-ui-react";
import { DateTime } from "luxon";
import { Form, Button, Ref } from "semantic-ui-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Interweave } from "interweave";
import { UrlMatcher } from "interweave-autolink";

const CommentComponent = ({
  comment,
  toggleLike,
  createReply,
  deleteComment,
  src,
  name,
  dispatch,
  uid,
  level2,
}) => {
  const [author, setAuthor] = useState(comment?.author);
  const [level3Comment, setLevel3Comment] = useState(
    typeof comment !== "string" ? { ...comment } : comment
  );
  const [liked, setLiked] = useState(level3Comment?.likes?.includes(uid));
  const setReplyAuthor = useCallback(
    async (id) => {
      try {
        if (comment.author.name || level3Comment.author.name || author.name)
          return;
        const popAuthor = await getReplyAuthor(id);
        setAuthor(popAuthor);
        setLevel3Comment((prev) =>
          typeof prev !== "string"
            ? { ...prev, author: popAuthor }
            : { _id: prev, author: popAuthor }
        );
        comment = level3Comment;
        if (!comment.likes || !Array.isArray(level3Comment.likes))
          // typeof comment.likes !== typeof [])
          await getCommentLikes();
      } catch (err) {
        console.log("setReplyAuthor err:", err.message);
      }
    },
    [comment, level3Comment, author, uid]
  );

  const getReplyAuthor = useCallback(async (id) => {
    if (typeof id !== "string") return id;
    try {
      const res = await axios.get(
        process.env.REACT_APP_BASE_URL + "/users/public/" + id,
        {
          withCredentials: true,
        }
      );
      //      console.log('response of getReplyAuthor', res.data.user);
      return res.data.user;
    } catch (err) {
      console.log("getReplyAuthor err:", err.message);
      return id;
    }
  }, []);

  const setLevel3Reply = useCallback(
    async (id) => {
      if (level3Comment.Level3) return;
      try {
        const popReply = await getLevel3Reply(id);
        setLevel3Comment(
          typeof level3Comment !== "string"
            ? { ...level3Comment, ...popReply, Level3: true }
            : { _id: level3Comment, ...popReply, Level3: true }
        );
        comment = { ...level3Comment, ...popReply, Level3: true };
        await getCommentLikes();
      } catch (err) {
        console.log("setReplyAuthor err:", err.message);
      }
    },
    [comment, level3Comment, author, uid]
  );

  const getLevel3Reply = useCallback(async (id) => {
    if (typeof id !== "string") return id;
    try {
      const res = await axios.get(
        process.env.REACT_APP_BASE_URL + "/comment/" + id,
        {
          withCredentials: true,
        }
      );
      return res.data.comment;
    } catch (err) {
      console.log("getLevel3Comment err:", err.message);
      return id;
    }
  }, []);

  useEffect(() => {
    if (typeof comment === "string") {
      setLevel3Reply(comment);
    } else if (typeof comment.author === "string") {
      setReplyAuthor(comment.author);
    }
  }, [comment, setReplyAuthor, setLevel3Reply]);

  const getCommentLikes = useCallback(
    async function getCommentLikes() {
      if (!level3Comment?.text && !level3Comment.author) return;
      if (typeof level3Comment.likes === typeof []) {
        setLiked(level3Comment.likes.includes(uid));
        return level3Comment.likes.includes(uid);
      }
      try {
        const id =
          typeof level3Comment === "string"
            ? level3Comment
            : typeof level3Comment?._id === "string"
            ? level3Comment?._id
            : level3Comment?._id?.$oid;
        if (!id || typeof id !== "string")
          return console.log("getCommentLikes ~ no id for", level3Comment);
        const res = await axios.get(
          process.env.REACT_APP_BASE_URL + "/comment/likes/" + id,
          { withCredentials: true }
        );
        setLevel3Comment({ ...level3Comment, likes: res.data.likes });
        setLiked(res.data.likes?.includes(uid));
        return res.data.likes.includes(uid);
      } catch (err) {
        console.log("getCommentLikes err:", err.message);
      }
    },
    [level3Comment, uid]
  );

  const navigate = useNavigate();
  const [shownLocal, setShownLocal] = useState(false);
  const [reply, setReply] = useState("");
  const mainRef = useRef(null);

  const toggleReply = () => {
    // console.log(mainRef?.current?.firstChild);
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

  const relDay = useMemo(
    () =>
      DateTime.fromISO(level3Comment?.updatedAt).toRelativeCalendar() ||
      "just now",
    [level3Comment]
  );

  const time = useMemo(() => {
    return (
      relDay[0].toLocaleUpperCase() +
      relDay.slice(1) +
      ", on " +
      DateTime.fromISO(level3Comment?.updatedAt).toLocaleString(
        DateTime.DATETIME_MED_WITH_WEEKDAY
      )
    );
  }, [relDay]);

  const handleCreateReply = async () => {
    if (reply.length < 1) return;
    try {
      level3Comment.comments.push(
        ...(await createReply(reply, level3Comment?._id))
      );
      setLevel3Comment({ ...level3Comment, comments: level3Comment.comments });
      setReply("");
      // setShownLocal(false);
    } catch (err) {
      console.log("handleReply err:", err.message);
    }
  };

  // if(level3Comment?.author?.name  && !author?.name)
  //   setAuthor(level3Comment.author);
  // else if(!level3Comment?.author?.name && author?.name)
  //   setLevel3Comment({...level3Comment, author: author});
  //   else
  // if(!level3Comment?.author?.name && !author?.name)
  // console.log('no author name for comment', level3Comment, author);

  // function getThis()
  // {
  //   console.log( '  this:  ' ,this);
  // }
  // getThis()
  if (!level3Comment?.text && !level3Comment.author) return;
  return (
    <Comment>
      <img
        as="a"
        src={
          level3Comment?.author?.profileImage ||
          author?.profileImage ||
          "https://react.semantic-ui.com/images/avatar/small/matt.jpg"
        }
        alt="avatar"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src =
            "https://source.unsplash.com/random/44x44/?face?" +
              level3Comment?.author?.name ||
            author?.name ||
            comment.author.name ||
            name ||
            "";
        }}
        style={{ width: "36px", height: "36px" }}
        className="ui avatar image object-cover rounded-full"
        onClick={() => {
          dispatch({
            type: "setViewProfile",
            payload: level3Comment?.author || author,
          });
          navigate(
            "/view-profile/" + level3Comment?.author?._id?.toString() ||
              author?._id?.toString()
          );
        }}
      />
      <Comment.Content>
        <Comment.Author
          onClick={() => {
            dispatch({
              type: "setViewProfile",
              payload: level3Comment?.author || author,
            });
            navigate(
              "/view-profile/" + level3Comment?.author?._id?.toString() ||
                author?._id?.toString()
            );
          }}
          as="a"
        >
          {author?.name ||
            level3Comment?.author?.name ||
            comment?.author?.name ||
            "....."}
        </Comment.Author>
        <Comment.Metadata>
          <span>{level3Comment?.updatedAt && time}</span>
        </Comment.Metadata>
        <Comment.Text>
          <Interweave
            newWindow={true}
            content={level3Comment?.text}
            matchers={[new UrlMatcher("url")]}
          />
        </Comment.Text>
        <Comment.Actions>
          <a
            href="#like"
            className={liked && "text-primary"}
            onClick={() => {
              setLiked(Boolean(!liked));
              // console.log("level3Comment: ", level3Comment);

              setLevel3Comment({
                ...level3Comment,
                likes: liked
                  ? level3Comment?.likes?.filter((id) => id !== uid)
                  : [...level3Comment?.likes, uid],
              });
              toggleLike(level3Comment?._id);
            }}
          >
            {level3Comment?.likes?.length || ""} Like
            {level3Comment?.likes?.length > 1 ? "s" : ""}
          </a>
          {!level3Comment.Level3 && (
            <a
              href="#reply"
              onClick={() => {
                setShownLocal(!shownLocal);
                toggleReply(level3Comment?._id);
              }}
            >
              {level3Comment?.comments?.length || ""}
              {level3Comment?.comments?.length > 1 ? " Replies" : " Reply"}
            </a>
          )}
          {(uid === level3Comment?.author?._id || uid === author?._id) && (
            <>
              {/* <a
                href="#edit"
                // onClick={edit}
              >
                Edit
              </a> */}
              <a
                href="#deleteComment"
                onClick={() => {
                  deleteComment(level3Comment?._id) && setLevel3Comment({});
                }}
              >
                Delete
              </a>
            </>
          )}
        </Comment.Actions>
      </Comment.Content>
      {level3Comment?.comments?.length > 0 || shownLocal ? (
        <Comment.Group
          onBlur={() =>
            setTimeout(() => {
              setReply("");
              setShownLocal(false);
            }, 400)
          }
        >
          {level3Comment?.comments &&
            level3Comment?.comments?.map((comment2, index) => (
              <CommentComponent
                key={comment2?._id || index}
                comment={comment2}
                toggleLike={toggleLike}
                deleteComment={deleteComment}
                createReply={createReply}
                src={src}
                name={name}
                dispatch={dispatch}
                uid={uid}
                level2={true}
              />
            ))}
          {shownLocal && (
            <Comment>
              <img
                as="a"
                alt="avatar"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src =
                    "https://source.unsplash.com/random/44x44/?face?" + name;
                }}
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
                        handleCreateReply();
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
