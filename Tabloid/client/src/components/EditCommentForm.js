import React, { useContext, useState, useEffect } from "react";
import { CommentContext } from "../providers/CommentProvider";
import { Button, Form } from "reactstrap";

export const EditCommentForm = ({ comment, postId, toggle }) => {
  const { updateComment } = useContext(CommentContext);
  const [updatedComment, setComment] = useState(comment);

  const handleControlledInputChange = (event) => {
    const newComment = Object.assign({}, updatedComment);
    newComment[event.target.name] = event.target.value;
    setComment(newComment);
  };

  const editComment = () => {
    updateComment(updatedComment, postId).then(toggle);
  };

  return (
    <form className="editCommentForm">
      <fieldset>
        <div className="form-group">
          <label htmlFor="name">
            Subject:
            <input
              type="text"
              name="subject"
              required
              autoFocus
              className="form-control"
              placeholder="Edit comment"
              defaultValue={comment.subject}
              onChange={handleControlledInputChange}
            />
          </label>
          <label htmlFor="name">
            Comment:
            <input
              type="text"
              name="content"
              required
              autoFocus
              className="form-control"
              placeholder="Edit comment"
              defaultValue={comment.content}
              onChange={handleControlledInputChange}
            />
          </label>
        </div>
      </fieldset>
      <Button
        color="primary"
        onClick={(e) => {
          e.preventDefault();
          editComment();
        }}
      >
        Save Updates
      </Button>
      <Button onClick={toggle}>Cancel</Button>
    </form>
  );
};
