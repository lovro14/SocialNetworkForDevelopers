import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import BusinessProfileActions from "./BusinessProfileActions";
import Experience from "./Experience";
import Education from "./Education";
import Project from "./Project";
import { getCurrentProfile, deleteAccount } from "../../store/actions";
import { Link } from "react-router-dom";
import Spinner from "../UI/Spinner";

class Dashboard extends Component {
  componentDidMount() {
    this.props.getCurrentProfile();
  }

  deleteAccount = () => {
    this.props.deleteAccount();
  };
  render() {
    const { user } = this.props.auth;
    const { profile, loading } = this.props.profile;
    let dashboardContent = null;
    if (loading) {
      dashboardContent = <Spinner />;
    } else if (profile === null) {
      dashboardContent = (
        <div>
          <p className="lead text-muted">Welcome {user.name}</p>
          <p>You haven't create profile, please add some info to create it</p>
          <Link to="/create-profile" className="btn btn-lg btn-info">
            Create Profile
          </Link>
        </div>
      );
    } else {
      if (Object.keys(profile).length > 0) {
        dashboardContent = (
          <div>
            <p className="lead text-muted">
              Welcome{" "}
              <Link to={`/business-profile/${profile.identityName}`}>
                {user.name}
              </Link>
            </p>
            <BusinessProfileActions />
            <Experience experience={profile.experience} />
            <Education education={profile.education} />
            <Project projects={profile.projects} />
            <div>
              <button className="btn btn-danger" onClick={this.deleteAccount}>
                Delete Account
              </button>
            </div>
          </div>
        );
      } else {
        dashboardContent = (
          <div>
            <p className="lead text-muted">Welcome {user.name}</p>
            <p>You haven't create profile, please add some info to create it</p>
            <Link to="/create-profile" className="btn btn-lg btn-info">
              Create Profile
            </Link>
          </div>
        );
      }
    }

    return (
      <div className="dashboard">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4">Dashboard</h1>
              {dashboardContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    auth: state.auth,
    profile: state.profile
  };
};

const mapDispatchToProps = {
  getCurrentProfile,
  deleteAccount
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
