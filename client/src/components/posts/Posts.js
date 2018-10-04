import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getPosts } from "../../store/actions";
import AddPost from "./AddPost";
import PostItem from "./PostItem";
import Spinner from "../UI/Spinner";

class Posts extends Component {
  componentDidMount() {
    this.props.getPosts();
  }
  render() {
    const { posts, loading } = this.props.post;
    let postContent;
    if (posts === null || loading) {
      postContent = <Spinner />;
    } else {
      if (posts.length > 0) {
        postContent = (
          <div>
            <AddPost />
            {posts.map(post => (
              <PostItem key={post._id} post={post} showActions={true} />
            ))}
          </div>
        );
      }else{
        postContent = <AddPost />
      }
    }
    return (
      <div className="feed">
        <div className="container">
          <div className="row">
            <div className="col-md-12">{postContent}</div>
          </div>
        </div>
      </div>
    );
  }
}

Posts.propTypes = {
  post: PropTypes.object.isRequired,
  getPosts: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    post: state.post
  };
};

const mapDispatchToProps = {
  getPosts
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Posts);
