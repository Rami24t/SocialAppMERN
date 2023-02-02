import React, {useState, useRef} from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CommentIcon from '@mui/icons-material/Comment';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Popover from '../popover/Popover'
import Comments from '../comments/Comments'
import {Button, Form, Ref } from 'semantic-ui-react'
import Badge from '@mui/material/Badge';

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    opacity: 0.8,
    right: -5,
    top: 14,
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


export default function RecipeReviewCard() {
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
      setTimeout(() => mainRef.current?.firstChild.focus(), 200);
    }
    console.log(mainRef.current?.firstChild);
    mainRef.current?.firstChild.focus();
  }

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card className="mb-2">
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            R
          </Avatar>
        }
        action={
          <IconButton aria-label="settings"
          >
            <MoreVertIcon                   id="basic-button"
                  aria-controls={open ? 'basic-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
                  onClick={handleClick}
/>
            <Popover anchorEl={anchorEl} setAnchorEl={setAnchorEl} open={open} handleClose={handleClose} handleClick={handleClick} />
          </IconButton>
        }
        title="Shrimp and Chorizo Paella"
        subheader="September 14, 2016"
      />
      <CardMedia
        component="img"
        height="194"
        image="/static/images/cards/paella.jpg"
        alt="Paella dish"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          This impressive paella is a perfect party dish and a fun meal to cook
          together with your guests. Add 1 cup of frozen peas along with the mussels,
          if you like.
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites" className='me-2'>
        <StyledBadge badgeContent={93} color="warning">
          <FavoriteIcon />
        </StyledBadge>
        </IconButton>
        <IconButton onClick={handleCommentClick} aria-label="Comment">
          <CommentIcon />
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