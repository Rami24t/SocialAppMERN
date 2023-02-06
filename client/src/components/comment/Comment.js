import React from 'react'
import { Comment } from 'semantic-ui-react'

const CommentComponent = ({author, time, text, likes}) => (
    <Comment>
      <Comment.Avatar as='a' src='https://react.semantic-ui.com/images/avatar/small/matt.jpg' />
      <Comment.Content>
        <Comment.Author as='a'>{author}</Comment.Author>
        <Comment.Metadata>
          <span>{time}</span>
        </Comment.Metadata>
        <Comment.Text>{text}</Comment.Text>
        <Comment.Actions>
          <a>{likes} Like{likes>1? 's' : ''}</a>
          <a>Reply</a>
        </Comment.Actions>
      </Comment.Content>
    </Comment>
)

export default CommentComponent