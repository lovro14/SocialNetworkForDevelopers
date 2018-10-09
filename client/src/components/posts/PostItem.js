import React, { Component } from "react";
import PropTypes from "prop-types";
import { isEmpty } from "../../utils";
import { connect } from "react-redux";
import {
  deletePost,
  likePost,
  unLikePost,
  editPost
} from "../../store/actions";
import classNames from "classnames";
import { Link } from "react-router-dom";
import Input from "../UI/Input";

class PostItem extends Component {
  state = {
    text: this.props.postProp.text,
    errors: {}
  };

  onChangeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

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

  editPost = (event, postId) => {
    event.preventDefault();
    this.props.editPost(this.state.text, postId);
  };

  render() {
    const { errors } = this.props;
    const { postProp, auth, showActions } = this.props;
    let postEdition = null;
    if (postProp.userId._id === auth.user._id && !showActions) {
      postEdition = (
        <form>
          <Input
            elementType="textarea"
            type="text"
            placeholder="Edit Post"
            name="text"
            value={this.state.text}
            onChange={e => this.onChangeHandler(e)}
            error={errors.text}
          />
          <button
            type="submit"
            className="btn btn-primary"
            onClick={event => this.editPost(event, postProp._id)}
            disabled={this.state.text === postProp.text}
          >
            Save Post
          </button>
        </form>
      );
    } else {
      postEdition = <p className="lead">{postProp.text}</p>;
    }

    return (
      <div className="posts">
        <div className="card card-body mb-3">
          <div className="row">
            <div className="col-md-2">
              <Link to={`/business-profile/${postProp.identityName}`}>
                <img
                  className="rounded-circle d-none d-md-block"
                  src={
                    isEmpty(postProp.userId.profilePicture)
                      ? "https://www.gravatar.com/avatar/anything?s=200&d=mm"
                      : `http://localhost:8000${postProp.userId.profilePicture}`
                  }
                  alt=""
                />
              </Link>
              <br />
              <p className="text-center">{postProp.name}</p>
            </div>
            <div className="col-md-10">
              {postEdition}

              {showActions ? (
                <span>
                  <button
                    onClick={() => this.onLikeHandler(postProp._id)}
                    type="button"
                    className="btn btn-light mr-1"
                  >
                    <i
                      className={classNames("fas fa-thumbs-up", {
                        "text-info": this.findUserLike(postProp.likes)
                      })}
                    />
                    <span className="badge badge-light">
                      {postProp.likes.length}
                    </span>
                  </button>
                  <button
                    onClick={() => this.onUnLikeHandler(postProp._id)}
                    type="button"
                    className="btn btn-light mr-1"
                  >
                    <i className="text-secondary fas fa-thumbs-down" />
                  </button>
                  <Link
                    to={`/posts/${postProp._id}`}
                    className="btn btn-info mr-1"
                  >
                    Comments
                  </Link>
                  {postProp.userId._id === auth.user._id ? (
                    <button
                      onClick={() => this.onDeleteClick(postProp._id)}
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
  postProp: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deletePost: PropTypes.func.isRequired,
  likePost: PropTypes.func.isRequired,
  unLikePost: PropTypes.func.isRequired,
  editPost: PropTypes.func.isRequired,
  showActions: PropTypes.bool.isRequired
};

const mapStateToProps = state => {
  return {
    auth: state.auth,
    errors: state.errors
  };
};

const mapDispatchToProps = {
  deletePost,
  likePost,
  unLikePost,
  editPost
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostItem);
