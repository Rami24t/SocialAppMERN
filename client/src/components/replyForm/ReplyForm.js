import React from "react";
import { Form, Button, Ref } from "semantic-ui-react";

const ReplyForm = ({ comment, setComment, post, addComment, mainRef }) => {
  return (
    <Form reply>
      {mainRef && (
        <Ref innerRef={mainRef}>
          <Form.TextArea
            name="comment"
            value={comment}
            onChange={(e) => setComment(e.currentTarget.value)}
          />
        </Ref>
      )}
      <Button
        onClick={() => {
          setComment("");
          addComment(comment, post._id);
        }}
        content="Add Reply"
        labelPosition="left"
        icon="edit"
        primary
      />
    </Form>
  );
};

export default React.forwardRef(ReplyForm);
