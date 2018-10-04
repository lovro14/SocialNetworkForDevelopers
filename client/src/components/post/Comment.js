import React, { Component } from "react";
import PropTypes from "prop-types";
import { isEmpty } from "../../utils";
import { connect } from "react-redux";
import { deleteComment } from "../../store/actions";

class Comment extends Component {
  onDeleteClick = (postId, commentId) => {
    this.props.deleteComment(postId, commentId);
  };

  render() {
    const { user } = this.props.auth;
    const { comment } = this.props;
    const { post } = this.props.post;
    return (
      <div className="card card-body mb-3">
        <div className="row">
          <div className="col-md-2">
            <a href="profile.html">
              <img
                className="rounded-circle d-none d-md-block"
                src={
                  isEmpty(comment.userId.profilePicture)
                    ? "https://www.gravatar.com/avatar/anything?s=200&d=mm"
                    : `http://localhost:8000${comment.userId.profilePicture}`
                }
                alt=""
              />
            </a>
            <br />
            <p className="text-center">{comment.name}</p>
          </div>
          <div className="col-md-10">
            <p className="lead">{comment.text}</p>
            {comment.userId._id === user._id ? (
              <button
                onClick={() => this.onDeleteClick(post._id, comment._id)}
                type="button"
                className="btn btn-danger mr-1"
              >
                <i className="fas fa-times" />
              </button>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

Comment.propTypes = {
  comment: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    auth: state.auth,
    post: state.post
  };
};

const mapDispatchToProps = {
  deleteComment
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Comment);
