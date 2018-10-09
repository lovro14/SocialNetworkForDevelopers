import React, { Component } from "react";
import PostItem from "../posts/PostItem";
import { getPost } from "../../store/actions";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Spinner from "../UI/Spinner";
import CommentForm from "./CommentForm";
import CommentFeed from "./CommentFeed";

class Post extends Component {
  componentDidMount() {
    if (this.props.match.params.postId) {
      this.props.getPost(this.props.match.params.postId);
    }
  }

  render() {
    const { post, loading } = this.props.post;
    let letPostContent;
    if (post === null || loading) {
      letPostContent = <Spinner />;
    } else {
      if (Object.keys(post).length > 0) {
        letPostContent = (
          <div>
            <PostItem postProp={post} showActions={false} />
            <CommentForm postId={post._id} />
            <CommentFeed
              comments={post.comments}
            />
          </div>
        );
      }
    }
    return (
      <div className="post">
        <div className="container">
          <div className="row">
            <div className="col-md-12">{letPostContent}</div>
          </div>
        </div>
      </div>
    );
  }
}

Post.propTypes = {
  getPost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    post: state.post,
  };
};

const mapDispatchToProps = {
  getPost
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Post);
