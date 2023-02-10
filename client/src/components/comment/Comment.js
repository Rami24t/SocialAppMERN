import React from 'react'
import { Comment } from 'semantic-ui-react'
import { DateTime } from "luxon"

const CommentComponent = ({comment, toggleLike, liked}) => (
    <Comment>
      <Comment.Avatar as='a' src={comment?.author?.image || 'https://react.semantic-ui.com/images/avatar/small/matt.jpg'} />
      <Comment.Content>
        <Comment.Author as='a'>{comment?.author?.name}</Comment.Author>
        <Comment.Metadata>
          <span>{comment?.updatedAt && DateTime.fromISO(comment?.updatedAt).toRelativeCalendar() + ', on ' + DateTime.fromISO(comment?.updatedAt).toLocaleString(DateTime.DATETIME_MED_WITH_WEEKDAY)}</span>
        </Comment.Metadata>
        <Comment.Text>{comment?.text}</Comment.Text>
        <Comment.Actions>
          <a href='#like' className={liked && 'text-primary'} onClick={()=>{toggleLike(comment._id)}}>{comment?.likes?.length || ''} Like{comment?.likes.length>1 ? 's' : ''}</a>
          <a href='#reply'>Reply</a>
        </Comment.Actions>
      </Comment.Content>
    </Comment>
)

export default CommentComponent