import React, { Component } from "react";
import PropTypes from "prop-types";
import { isEmpty } from "../../utils";
import { connect } from "react-redux";
import { deletePost, likePost, unLikePost } from "../../store/actions";
import classNames from "classnames";
import { Link } from "react-router-dom";

class PostItem extends Component {
  onDeleteClick = postId => {
    this.props.deletePost(postId);
  };

  findUserLike = likes => {
    const { auth } = this.props;
    if (likes.filter(like => like.user === auth.user.id).length > 0) {
      return true;
    } else {
      return false;
    }
  };

  onLikeHandler = postId => {
    this.props.likePost(postId);
  };

  onUnLikeHandler = postId => {
    this.props.unLikePost(postId);
  };

  render() {
    const { post, auth, showActions } = this.props;
    return (
      <div className="posts">
        <div className="card card-body mb-3">
          <div className="row">
            <div className="col-md-2">
              <a href="profile.html">
                <img
                  className="rounded-circle d-none d-md-block"
                  src={
                    isEmpty(post.userId.profilePicture)
                      ? "https://www.gravatar.com/avatar/anything?s=200&d=mm"
                      : `http://localhost:8000${post.userId.profilePicture}`
                  }
                  alt=""
                />
              </a>
              <br />
              <p className="text-center">{post.name}</p>
            </div>
            <div className="col-md-10">
              <p className="lead">{post.text}</p>
              {showActions ? (
                <span>
                  <button
                    onClick={() => this.onLikeHandler(post._id)}
                    type="button"
                    className="btn btn-light mr-1"
                  >
                    <i
                      className={classNames("fas fa-thumbs-up", {
                        "text-info": this.findUserLike(post.likes)
                      })}
                    />
                    <span className="badge badge-light">
                      {post.likes.length}
                    </span>
                  </button>
                  <button
                    onClick={() => this.onUnLikeHandler(post._id)}
                    type="button"
                    className="btn btn-light mr-1"
                  >
                    <i className="text-secondary fas fa-thumbs-down" />
                  </button>
                  <Link to={`/posts/${post._id}`} className="btn btn-info mr-1">
                    Comments
                  </Link>
                  {post.userId._id === auth.user._id ? (
                    <button
                      onClick={() => this.onDeleteClick(post._id)}
                      type="button"
                      className="btn btn-danger mr-1"
                    >
                      <i className="fas fa-times" />
                    </button>
                  ) : null}
                </span>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deletePost: PropTypes.func.isRequired,
  likePost: PropTypes.func.isRequired,
  unLikePost: PropTypes.func.isRequired,
  showActions: PropTypes.bool.isRequired
};

const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};

const mapDispatchToProps = {
  deletePost,
  likePost,
  unLikePost
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostItem);
