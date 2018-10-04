import React, { Component } from "react";
import PropTypes from "prop-types";
import Comment from "./Comment";

class CommentFeed extends Component {
  render() {
    const { comments } = this.props;
    let commentsContent = comments
      .reverse()
      .map(comment => (
        <Comment
          key={comment._id}
          comment={comment}
        />
      ));
    return <div className="comments">{commentsContent}</div>;
  }
}

CommentFeed.propTypes = {
  comments: PropTypes.array.isRequired
};
export default CommentFeed;
