import React, { Component } from "react";
import { getProfileByIdentityName } from "../../store/actions";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../UI/Spinner";
import BusinessProfileHeader from "./BusinessProfileHeader";
import BusinessProfileAbout from "./BusinessProfileAbout";
import BusinessProfileExperience from "./BusinessProfileExperience";
import BusinessProfileEducation from "./BusinessProfileEducation";
import BusinessProfileProjects from "./BusinessProfileProjects";

class BusinessProfile extends Component {
  componentDidMount() {
    if (this.props.match.params.identityName) {
      this.props.getProfileByIdentityName(this.props.match.params.identityName);
    }
  }

  render() {
    const { profile, loading } = this.props.profile;
    const { user } = this.props.auth;
    let businessProfileItems;

    if (profile === null || loading) {
      businessProfileItems = <Spinner />;
    } else {
      if (Object.keys(profile).length > 0) {
        const setProfilePicture =
          user._id === profile.userId._id ? true : false;
        businessProfileItems = (
          <div>
            <BusinessProfileHeader
              profilePicture={profile.userId.profilePicture}
              name={profile.userId.name}
              status={profile.status}
              location={profile.location}
              social={profile.social}
              company={profile.company}
              website={profile.website}
              setProfilePicture={setProfilePicture}
            />
            <BusinessProfileAbout
              bio={profile.bio}
              skills={profile.skills}
              identityName={profile.identityName}
            />
            <br />
            <BusinessProfileExperience experience={profile.experience} />
            <br />
            <BusinessProfileEducation education={profile.education} />
            <br />
            <BusinessProfileProjects projects={profile.projects} />
          </div>
        );
      } else {
        businessProfileItems = <h4>Not Found any profile</h4>;
      }
    }
    return (
      <div className="profile">
        <div className="container">{businessProfileItems}</div>
      </div>
    );
  }
}

BusinessProfile.propTypes = {
  getProfileByIdentityName: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    profile: state.profile,
    auth: state.auth
  };
};

const mapDispatchToProps = {
  getProfileByIdentityName
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BusinessProfile);
