import { Component } from "react";
import { connect } from "react-redux";
import { logoutUser } from "../../store/actions";
import PropTypes from "prop-types";
import {withRouter} from "react-router-dom";

class Logout extends Component {
  componentWillMount() {
    this.props.logoutUser(this.props.history);
  }

  render() {
    return null;
  }
}

Logout.propTypes = {
  logoutUser: PropTypes.func.isRequired
};

const mapDispatchToProps = {
  logoutUser
};

export default connect(
  null,
  mapDispatchToProps
)(withRouter(Logout));
