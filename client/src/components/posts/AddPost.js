import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addPost, clearErrors } from "../../store/actions";
import Input from "../UI/Input";

class AddPost extends Component {
  state = {
    text: "",
    errors: {}
  };

  onChangeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  componentDidMount() {
    this.props.clearErrors();
  }

  addPostHandler = e => {
    e.preventDefault();
    this.props.addPost({ text: this.state.text });
    this.setState({ text: "" });
  };
  render() {
    const { errors } = this.props;
    return (
      <div className="post-form mb-3">
        <div className="card card-info">
          <div className="card-header bg-info text-white">Say Somthing...</div>
          <div className="card-body">
            <form>
              <Input
                elementType="textarea"
                type="text"
                placeholder="Create a post"
                name="text"
                value={this.state.text}
                onChange={e => this.onChangeHandler(e)}
                error={errors.text}
              />
              <button
                type="submit"
                className="btn btn-dark"
                onClick={this.addPostHandler}
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

AddPost.propTypes = {
  errors: PropTypes.object.isRequired,
  addPost: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    errors: state.errors
  };
};

const mapDispatchToProps = {
  addPost,
  clearErrors
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddPost);
