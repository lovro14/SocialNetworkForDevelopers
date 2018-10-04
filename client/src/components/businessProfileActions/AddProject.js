import React, { Component } from "react";
import Input from "../UI/Input";
import { addProject, clearErrors } from "../../store/actions";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";

class AddProject extends Component {
  state = {
    title: "",
    projectSummary: "",
    from: "",
    to: "",
    role: "",
    contribution: "",
    technologies: "",
    errors: {}
  };

  componentDidMount() {
    this.props.clearErrors();
  }

  componentWillReceiveProps = nextProps => {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  };

  onChangeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    const newProject = {
      title: this.state.title,
      projectSummary: this.state.projectSummary,
      from: this.state.from,
      to: this.state.to,
      role: this.state.role,
      contribution: this.state.contribution,
      technologies: this.state.technologies
    };
    this.props.addProject(newProject, this.props.history);
  };

  render() {
    const { errors } = this.props;
    return (
      <div className="add-education">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Add Your Custom Project</h1>
              <p className="lead text-center">
                Add any of yours custom projects
              </p>
              <small className="d-block pb-3">* = required field</small>
              <form noValidate onSubmit={this.onSubmit}>
                <Input
                  elementType="input"
                  type="text"
                  placeholder="* Project Title"
                  name="title"
                  value={this.state.title}
                  onChange={e => this.onChangeHandler(e)}
                  error={errors.title}
                />

                <Input
                  elementType="input"
                  type="text"
                  placeholder="* Project Summary"
                  name="projectSummary"
                  value={this.state.projectSummary}
                  onChange={e => this.onChangeHandler(e)}
                  error={errors.projectSummary}
                />

                <h6>From Date</h6>
                <Input
                  elementType="input"
                  type="date"
                  placeholder=""
                  name="from"
                  value={this.state.from}
                  onChange={e => this.onChangeHandler(e)}
                  error={errors.from}
                />

                <h6>To Date</h6>
                <Input
                  elementType="input"
                  type="date"
                  placeholder=""
                  name="to"
                  value={this.state.to}
                  onChange={e => this.onChangeHandler(e)}
                  error={errors.to}
                  disabled={this.state.disabled ? "disabled" : ""}
                />

                <Input
                  elementType="input"
                  type="text"
                  placeholder="* Your Role"
                  name="role"
                  value={this.state.role}
                  onChange={e => this.onChangeHandler(e)}
                  error={errors.role}
                />

                <Input
                  elementType="input"
                  type="text"
                  placeholder="* Contribution"
                  name="contribution"
                  value={this.state.contribution}
                  onChange={e => this.onChangeHandler(e)}
                  error={errors.contribution}
                />

                <Input
                  elementType="input"
                  type="text"
                  placeholder="* Technologies"
                  name="technologies"
                  value={this.state.technologies}
                  onChange={e => this.onChangeHandler(e)}
                  error={errors.technologies}
                />

                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

AddProject.propTypes = {
  errors: PropTypes.object.isRequired,
  addProject: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    errors: state.errors
  };
};

const mapDispatchToProps = {
  addProject,
  clearErrors
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(AddProject));
