import React, { Component } from "react";
import Input from "../UI/Input";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addEducation, clearErrors } from "../../store/actions";
import { withRouter } from "react-router-dom";

class AddEducation extends Component {
  state = {
    collegeName: "",
    degree: "",
    fieldOfStudy: "",
    from: "",
    to: "",
    current: false,
    description: "",
    errors: {},
    disabled: false
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

  onCheck = () => {
    this.setState(prevState => ({
      current: !prevState.current,
      disabled: !prevState.disabled
    }));
  };

  onSubmit = e => {
    e.preventDefault();
    const newEducation = {
      collegeName: this.state.collegeName,
      degree: this.state.degree,
      fieldOfStudy: this.state.fieldOfStudy,
      from: this.state.from,
      to: this.state.current ? "" : this.state.to,
      current: this.state.current,
      description: this.state.description
    };
    this.props.addEducation(newEducation, this.props.history);
  };

  render() {
    const { errors } = this.props;
    return (
      <div className="section add-education">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Add Your Education</h1>
              <p className="lead text-center">
                Add any college that you have attended
              </p>
              <small className="d-block pb-3">* = required field</small>
              <form noValidate onSubmit={this.onSubmit}>
                <Input
                  elementType="input"
                  type="text"
                  placeholder="* College"
                  name="collegeName"
                  value={this.state.collegeName}
                  onChange={e => this.onChangeHandler(e)}
                  error={errors.collegeName}
                />

                <Input
                  elementType="input"
                  type="text"
                  placeholder="* Degree"
                  name="degree"
                  value={this.state.degree}
                  onChange={e => this.onChangeHandler(e)}
                  error={errors.degree}
                />

                <Input
                  elementType="input"
                  type="text"
                  placeholder="Field of Study"
                  name="fieldOfStudy"
                  value={this.state.fieldOfStudy}
                  onChange={e => this.onChangeHandler(e)}
                  error={errors.fieldOfStudy}
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
                <div className="form-check mb-4">
                  <Input
                    elementType="checkbox"
                    className="form-check-input"
                    type="checkbox"
                    name="current"
                    value=""
                    id="current"
                    placeholder=""
                    checked={this.state.current}
                    onChange={e => this.onCheck()}
                  />
                  <label className="form-check-label">Current</label>
                </div>

                <Input
                  elementType="textarea"
                  type="text"
                  placeholder="* Description"
                  name="description"
                  value={this.state.description}
                  onChange={e => this.onChangeHandler(e)}
                  error={errors.description}
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

AddEducation.propTypes = {
  errors: PropTypes.object.isRequired,
  addEducation: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    errors: state.errors
  };
};

const mapDispatchToProps = {
  addEducation,
  clearErrors
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(AddEducation));
