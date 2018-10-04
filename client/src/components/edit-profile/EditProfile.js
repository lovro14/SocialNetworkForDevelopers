import React, { Component } from "react";
import Input from "../UI/Input";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { createProfile, getCurrentProfile } from "../../store/actions";
import PropTypes from "prop-types";
import { isEmpty } from "../../utils";

class EditProfile extends Component {
  state = {
    displaySocialInputs: false,
    identityName: "",
    company: "",
    website: "",
    location: "",
    status: "",
    skills: "",
    github: "",
    bio: "",
    twitter: "",
    facebook: "",
    linkedin: "",
    youtube: "",
    instagram: "",
    errors: {}
  };

  swithcDisplaySocialInputs = () => {
    this.setState(prevState => ({
      displaySocialInputs: !prevState.displaySocialInputs
    }));
  };
  onChangeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  componentWillReceiveProps = nextProps => {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }

    if (nextProps.profile.profile) {
      const profile = nextProps.profile.profile;
      const skillsCSV = profile.skills.join(",");

      profile.identityName = !isEmpty(profile.identityName)
        ? profile.identityName
        : "";
      profile.company = !isEmpty(profile.company) ? profile.company : "";
      profile.website = !isEmpty(profile.website) ? profile.website : "";
      profile.location = !isEmpty(profile.location) ? profile.location : "";
      profile.github = !isEmpty(profile.github) ? profile.github : "";
      profile.bio = !isEmpty(profile.bio) ? profile.bio : "";
      profile.social = !isEmpty(profile.social) ? profile.social : {};
      profile.twitter = !isEmpty(profile.social.twitter)
        ? profile.social.twitter
        : "";
      profile.facebook = !isEmpty(profile.social.facebook)
        ? profile.social.facebook
        : "";
      profile.linkedin = !isEmpty(profile.social.linkedin)
        ? profile.social.linkedin
        : "";
      profile.youtube = !isEmpty(profile.social.youtube)
        ? profile.social.youtube
        : "";
      profile.instagram = !isEmpty(profile.social.instagram)
        ? profile.social.instagram
        : "";

      this.setState({
        identityName: profile.identityName,
        company: profile.company,
        website: profile.website,
        location: profile.location,
        status: profile.status,
        skills: skillsCSV,
        github: profile.github,
        bio: profile.bio,
        twitter: profile.twitter,
        facebook: profile.facebook,
        linkedin: profile.linkedin,
        youtube: profile.youtube,
        instagram: profile.instagram
      });
    }
  };

  componentDidMount() {
    this.props.getCurrentProfile();
  }

  onSubmit = e => {
    e.preventDefault();
    const profileData = {
      identityName: this.state.identityName,
      status: this.state.status,
      company: this.state.company,
      website: this.state.website,
      github: this.state.github,
      location: this.state.location,
      skills: this.state.skills,
      bio: this.state.bio,
      twitter: this.state.twitter,
      facebook: this.state.facebook,
      instagram: this.state.instagram,
      youtube: this.state.youtube,
      linkedin: this.state.linkedin
    };
    this.props.createProfile(profileData, this.props.history);
  };
  render() {
    const { errors } = this.state;

    const selectOptions = [
      { value: "", displayValue: "* Select Professional Status" },
      { value: "Developer", displayValue: "Developer" },
      { value: "Junior Developer", displayValue: "Junior Developer" },
      { value: "Senior Developer", displayValue: "Senior Developer" },
      { value: "Manager", displayValue: "Manager" },
      { value: "Instructor", displayValue: "Instructor" },
      { value: "Student", displayValue: "Student" }
    ];

    let social = null;
    if (this.state.displaySocialInputs) {
      social = (
        <div>
          <Input
            value={this.state.twitter}
            elementType="inputGroup"
            type="text"
            placeholder="Twitter Profile URL"
            name="twitter"
            error={errors.twitter}
            onChange={e => this.onChangeHandler(e)}
            icon="fab fa-twitter"
          />

          <Input
            value={this.state.facebook}
            elementType="inputGroup"
            type="text"
            placeholder="Facebook Profile URL"
            name="facebook"
            error={errors.facebook}
            onChange={e => this.onChangeHandler(e)}
            icon="fab fa-facebook"
          />

          <Input
            value={this.state.instagram}
            elementType="inputGroup"
            type="text"
            placeholder="Instagram Profile URL"
            name="instagram"
            error={errors.instagram}
            onChange={e => this.onChangeHandler(e)}
            icon="fab fa-instagram"
          />

          <Input
            value={this.state.youtube}
            elementType="inputGroup"
            type="text"
            placeholder="Youtube Profile URL"
            name="youtube"
            error={errors.youtube}
            onChange={e => this.onChangeHandler(e)}
            icon="fab fa-youtube"
          />

          <Input
            value={this.state.linkedin}
            elementType="inputGroup"
            type="text"
            placeholder="Linkedin Profile URL"
            name="linkedin"
            error={errors.linkedin}
            onChange={e => this.onChangeHandler(e)}
            icon="fab fa-linkedin"
          />
        </div>
      );
    }

    return (
      <div className="create-profile">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Edit Your Profile</h1>

              <small className="d-block pb-3">* = required field</small>
              <form noValidate onSubmit={this.onSubmit}>
                <Input
                  elementType="input"
                  type="text"
                  placeholder="* Unique identifier, nickname"
                  name="identityName"
                  value={this.state.identityName}
                  onChange={e => this.onChangeHandler(e)}
                  error={errors.identityName}
                  info=" A unique identifier for your profile URL, your nickname"
                />

                <Input
                  elementType="select"
                  type="text"
                  placeholder=""
                  name="status"
                  value={this.state.status}
                  onChange={e => this.onChangeHandler(e)}
                  error={errors.status}
                  info="Set your proffessional status"
                  selectOptions={selectOptions}
                />

                <Input
                  elementType="input"
                  type="text"
                  placeholder="Company"
                  name="company"
                  value={this.state.company}
                  onChange={e => this.onChangeHandler(e)}
                  error={errors.company}
                  info=" Your company or company where you are working"
                />

                <Input
                  elementType="input"
                  type="text"
                  placeholder="Website"
                  name="website"
                  value={this.state.website}
                  onChange={e => this.onChangeHandler(e)}
                  error={errors.website}
                  info=" Your website"
                />

                <Input
                  value={this.state.github}
                  elementType="inputGroup"
                  type="text"
                  placeholder="Github URL"
                  name="github"
                  error={errors.github}
                  onChange={e => this.onChangeHandler(e)}
                  icon="fab fa-github"
                />

                <Input
                  elementType="input"
                  type="text"
                  placeholder="Location"
                  name="location"
                  value={this.state.location}
                  onChange={e => this.onChangeHandler(e)}
                  error={errors.location}
                  info="City, Country"
                />

                <Input
                  elementType="input"
                  type="text"
                  placeholder="Skills"
                  name="skills"
                  value={this.state.skills}
                  onChange={e => this.onChangeHandler(e)}
                  error={errors.skills}
                  info="Use comma separated values (eg. Node.js,React,HTML,CSS)"
                />

                <Input
                  elementType="textarea"
                  type="text"
                  placeholder="Mini-resume"
                  name="bio"
                  value={this.state.bio}
                  onChange={e => this.onChangeHandler(e)}
                  error={errors.skills}
                  info="Tell us a little bit of your self"
                />

                <div className="mb-3">
                  <button
                    type="button"
                    className="btn btn-light"
                    onClick={this.swithcDisplaySocialInputs}
                  >
                    Add Social Network Links
                  </button>
                  <span className="text-muted">Optional</span>
                  {social}
                </div>

                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

EditProfile.propTyes = {
  errors: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors,
  profile: state.profile
});

const mapDispatchToProps = {
  createProfile,
  getCurrentProfile
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(EditProfile));
