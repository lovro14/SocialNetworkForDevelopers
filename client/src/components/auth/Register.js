import React, { Component } from "react";
import { signUser } from "../../store/actions";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Input from "../UI/Input";

class Register extends Component {
  state = {
    name: "",
    email: "",
    password: "",
    confirmedPassword: "",
    errors: {}
  };

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }

    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChangeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmitHandler = e => {
    e.preventDefault();
    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      confirmedPassword: this.state.confirmedPassword
    };
    this.props.signUser(newUser, "/api/users/");
  };

  render() {
    const { errors } = this.state;
    return (
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Sign Up</h1>
              <p className="lead text-center">Create your account</p>
              <form noValidate onSubmit={this.onSubmitHandler}>
                <Input
                  elementType="input"
                  type="text"
                  placeholder="Name"
                  name="name"
                  value={this.state.name}
                  onChange={e => this.onChangeHandler(e)}
                  error={errors.name}
                />
                <Input
                  elementType="input"
                  type="email"
                  placeholder="Email"
                  name="email"
                  value={this.state.email}
                  onChange={e => this.onChangeHandler(e)}
                  error={errors.email}
                />
                <Input
                  elementType="input"
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={this.state.password}
                  onChange={e => this.onChangeHandler(e)}
                  error={errors.password}
                />
                <Input
                  elementType="input"
                  type="password"
                  placeholder="Confirm Password"
                  name="confirmedPassword"
                  value={this.state.confirmedPassword}
                  onChange={e => this.onChangeHandler(e)}
                  error={errors.confirmedPassword}
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

Register.propTypes = {
  signUser: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    errors: state.errors,
    auth: state.auth
  };
};

const mapDispatchToProps = {
  signUser
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Register);
