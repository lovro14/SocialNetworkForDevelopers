import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { signUser } from "../../store/actions";
import Input from "../UI/Input";
class Login extends Component {
  state = {
    email: "",
    password: "",
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
    const userData = {
      email: this.state.email,
      password: this.state.password
    };
    this.props.signUser(userData, "/api/users/login");
  };

  render() {
    const { errors } = this.state;
    return (
      <div className="login">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Log In</h1>
              <p className="lead text-center">
                Sign in to your DevConnector account
              </p>
              <form noValidate onSubmit={this.onSubmitHandler}>
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
                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
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
)(Login);
