import React, { useState, useRef } from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CommentIcon from "@mui/icons-material/Comment";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Popover from "../popover/Popover";
import Comments from "../comments/Comments";
import Badge from "@mui/material/Badge";
import { useNavigate } from "react-router-dom";
import "./PostCard.css";
import ReplyForm from "../replyForm/ReplyForm";
import { Interweave } from "interweave";
import { UrlMatcher } from "interweave-autolink";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    zIndex: 0,
    opacity: 0.75,
    right: -6,
    top: 7,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}));

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function PostCard({
  post,
  liked,
  toggleLike,
  dispatch,
  editPost,
  deletePost,
  ownPost,
  addComment,
}) {
  // Popover
  const [anchorEl, setAnchorEl] = useState(null);
  const mainRef = useRef(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [expanded, setExpanded] = useState(false);

  const handleCommentClick = () => {
    if (!expanded) {
      setExpanded(true);
      setTimeout(() => {
        mainRef?.current?.firstChild?.focus();
        mainRef?.current?.firstChild?.scrollIntoView({ behavior: "smooth" });
      }, 200);
    }
    // console.log(mainRef?.current?.firstChild);
    mainRef?.current?.firstChild?.focus();
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const navigate = useNavigate();

  const postDate = new Date(post?.createdAt).toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
  // console.log(ownPost)

  const [comment, setComment] = useState("");

  //  console.log(post.comments)

  return (
    <article>
      <Card className="mb-2">
        <CardHeader
          avatar={
            // <Link to={'/view-profile/'+post?.author?._id?.toString()}>
            <img
              src={post?.author?.profileImage.replace(
                "/upload",
                "/upload/c_thumb,g_face,h_80,w_80/f_auto,q_auto"
              )}
              alt="author"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src =
                  "https://source.unsplash.com/random/44x44/?face?" +
                  post?.author?.name;
              }}
              className="cursor-pointer rounded-circle object-cover "
              style={{ width: "44px", height: "44px" }}
              title={post?.author?.name}
              onClick={() => {
                dispatch({ type: "setViewProfile", payload: post?.author });
                navigate("/view-profile/" + post?.author?._id?.toString());
              }}
            />
          }
          action={
            ownPost && (
              <IconButton aria-label="settings">
                <MoreVertIcon
                  id="basic-button"
                  aria-controls={open ? "basic-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                  onClick={handleClick}
                />
                <Popover
                  ownPost={ownPost}
                  anchorEl={anchorEl}
                  setAnchorEl={setAnchorEl}
                  open={open}
                  handleClose={handleClose}
                  handleClick={handleClick}
                  editPost={editPost}
                  deletePost={deletePost}
                />
              </IconButton>
            )
          }
          title={
            post?.author?.name + " says:  " + (post?.title || "Post Title")
          }
          subheader={postDate || "Post Date"}
        />
        {post?.postImage && (
          <a
            href={post?.postImage.replace(
              "upload/",
              `upload/c_limit,h_${window.innerHeight}/f_auto/q_auto/co_white,l_text:Arial_12:Rami's%20Social%20App/fl_layer_apply,g_south/`
            )}
            target="_blank"
            rel="noreferrer"
          >
            <CardMedia
              component="img"
              height="300"
              image={
                post?.postImage
                  ? // ? window.innerWidth < 400
                    post.postImage.replace(
                      "upload/",
                      "upload/if_w_gt_h/c_auto,h_31/if_else/c_auto,w_39/if_end/f_auto/q_auto/co_white,l_text:Arial_12:Rami's%20Social%20App/fl_layer_apply,g_south/"
                    )
                  : // : post.postImage.replace(
                    //     "upload/",
                    //     "upload/if_w_gt_h/c_auto,h_310/if_else/c_auto,w_390/if_end/f_auto/q_auto/co_white,l_text:Arial_12:Rami's%20Social%20App/fl_layer_apply,g_south/"
                    //   )
                    ""
              }
              onLoad={(e) => {
                if (
                  !e.target.src.includes(
                    "upload/if_w_gt_h/c_auto,h_31/if_else/c_auto,w_39/if_end/f_auto/q_auto/co_white,l_text:Arial_12:Rami's%20Social%20App/fl_layer_apply,g_south/"
                  )
                ) {
                  e.target.onLoad = null;
                  return;
                }
                e.target.src = post?.postImage.replace(
                  "upload/",
                  `upload/c_lfill,g_auto,w_${e.target.clientWidth},h_${e.target.clientHeight}/f_auto/q_auto/co_white,l_text:Arial_12:Rami's%20Social%20App/fl_layer_apply,g_south/`
                );
              }}
              alt="Post Image"
              style={{ objectFit: "contain", objectPosition: "center" }}
              className="cursor-pointer object-contain object-center"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = `https://source.unsplash.com/random/${
                  e.target.clientWidth
                }x${e.target.clientHeight}/?${
                  post?.title || post?.text || post?.author?.name || "random"
                }`;
              }}
            />
          </a>
        )}
        {post?.text && (
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              <Interweave
                newWindow={true}
                content={post?.text || "post text"}
                matchers={[new UrlMatcher("url")]}
              />
            </Typography>
          </CardContent>
        )}
        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites" className="me-2">
            <StyledBadge badgeContent={post?.likes?.length} color="primary">
              {/* Heart icon */}
              <FavoriteIcon
                color={liked ? "warning" : "secondary"}
                style={{ zIndex: 1 }}
                onClick={toggleLike}
              />
            </StyledBadge>
          </IconButton>
          <IconButton onClick={handleCommentClick} aria-label="Comment">
            <StyledBadge
              badgeContent={post?.comments?.length}
              color="secondary"
            >
              <CommentIcon color="secondary" style={{ zIndex: 1 }} />
            </StyledBadge>
          </IconButton>
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </ExpandMore>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Comments comments={post?.comments} />
            {/* reply form */}
            <ReplyForm
              mainRef={mainRef}
              comment={comment}
              setComment={setComment}
              addComment={addComment}
              post={post}
            />
          </CardContent>
        </Collapse>
      </Card>
    </article>
  );
}
