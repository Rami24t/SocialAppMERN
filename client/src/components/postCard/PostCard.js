import React, {useState, useRef} from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CommentIcon from '@mui/icons-material/Comment';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Popover from '../popover/Popover'
import Comments from '../comments/Comments'
import {Button, Form, Ref } from 'semantic-ui-react'
import Badge from '@mui/material/Badge';
import { useNavigate, Link } from 'react-router-dom';

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    zIndex: 0,
    opacity: 0.75,
    right: -6,
    top: 7,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}));


const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));


export default function PostCard({post, dispatch, editPost, deletePost}) {
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
    if(!expanded)
    {
      setExpanded(true);
      setTimeout(() => mainRef?.current?.firstChild.focus(), 200);
    }
    console.log(mainRef?.current?.firstChild);
    mainRef.current?.firstChild.focus();
  }

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const navigate = useNavigate();

  const postDate = new Date(post?.createdAt).toLocaleString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true
  });
  return (
    <Card className="mb-2">
      <CardHeader
        avatar={
          // <Link to={'/view-profile/'+post?.author?._id?.toString()}>
          <img src={post?.author?.profileImage} alt="author" className="rounded-circle cursor-pointer" style={{width: "40px"}}
          title={post?.author?.name}
          onClick={
            ()=>{dispatch({type: 'setViewProfile', payload: post?.author});
            navigate('/view-profile/'+post?.author?._id?.toString());
            }
            }
          />
        }
        action={
          <IconButton aria-label="settings"
          >
            <MoreVertIcon
                  id="basic-button"
                  aria-controls={open ? 'basic-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
                  onClick={handleClick}
/>
            <Popover anchorEl={anchorEl} setAnchorEl={setAnchorEl} open={open} handleClose={handleClose} handleClick={handleClick} editPost={editPost} deletePost={deletePost} />
          </IconButton>
        }
        title={post?.author?.name+' says:  '+ (post?.title || 'Post Title')}
        subheader={postDate || 'Post Date'}
      />
      {post?.postImage &&<a href={post.postImage} target='blank'><CardMedia
        component="img"
        height= "194"
        image={post?.postImage || ''}
        alt="Post Image"
      /></a>}
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {post?.text || 'post text'}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites" className='me-2'>
        <StyledBadge badgeContent={93} color="primary">
        {/* Heart icon */}
          <FavoriteIcon style={{zIndex: 1}} />
        </StyledBadge>
        </IconButton>
        <IconButton onClick={handleCommentClick} aria-label="Comment">
        <StyledBadge badgeContent={3} color="secondary">
          <CommentIcon style={{zIndex: 1}} />
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
          <Comments />
          {/* reply form */}
          <Form reply>
            <Ref innerRef={mainRef}>
              <Form.TextArea />
            </Ref>
            <Button content='Add Reply' labelPosition='left' icon='edit' primary />
          </Form>
        </CardContent>
      </Collapse>
    </Card>
  );
}