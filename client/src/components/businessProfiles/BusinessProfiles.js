import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getBusinessProfiles } from "../../store/actions";
import BusinessProfileItem from "./businessProfileItem/BusinessProfileItem";
import Spinner from "../UI/Spinner";

class BusinessProfiles extends Component {
  componentDidMount() {
    this.props.getBusinessProfiles();
  }
  render() {
    const { profiles, loading } = this.props.profile;
    let businessProfileItems;
    if (profiles === null || loading) {
      businessProfileItems = <Spinner />;
    } else {
      if (profiles.length > 0) {
        businessProfileItems = profiles.map(profileItem => (
          <BusinessProfileItem
            key={profileItem._id}
            businessProfile={profileItem}
          />
        ));
      } else {
        businessProfileItems = <h4>No profile found</h4>;
      }
    }
    return (
      <div className="profiles">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4 text-center">Developer Profiles</h1>
              <p className="lead text-center">
                Browse and connect with developers
              </p>
              {businessProfileItems}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

BusinessProfiles.propTypes = {
  profile: PropTypes.object.isRequired,
  getBusinessProfiles: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    profile: state.profile
  };
};

const mapDispatchToProps = {
  getBusinessProfiles
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BusinessProfiles);
