import React, { Component } from "react";
import Input from "../UI/Input";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addComment, clearErrors } from "../../store/actions";

class CommentForm extends Component {
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

  onSubmitHandler = e => {
    e.preventDefault();
    this.props.addComment({ text: this.state.text }, this.props.postId);
    this.setState({ text: "" });
  };
  render() {
    const { errors } = this.props;
    return (
      <div className="post-form mb-3">
        <div className="card card-info">
          <div className="card-header bg-info text-white">Say Somthing...</div>
          <div className="card-body">
            <form noValidate onSubmit={this.onSubmitHandler}>
              <Input
                elementType="textarea"
                type="text"
                name="text"
                placeholder="Comment"
                value={this.state.text}
                onChange={e => this.onChangeHandler(e)}
                error={errors.text}
              />
              <button type="submit" className="btn btn-dark">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

CommentForm.propTypes = {
  errors: PropTypes.object.isRequired,
  addComment: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
  postId: PropTypes.string.isRequired
};

const mapStateToProps = state => {
  return {
    errors: state.errors
  };
};

const mapDispatchToProps = {
  addComment,
  clearErrors
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CommentForm);
