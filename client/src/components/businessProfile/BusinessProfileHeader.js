import React, { Component } from "react";
import { isEmpty } from "../../utils";
import PropTypes from "prop-types";
import { uploadProfilePicture } from "../../store/actions";
import { connect } from "react-redux";

class BusinessProfileHeader extends Component {
  state = {
    selectedFile: null
  };

  fileSelecedHandler = event => {
    this.setState({
      selectedFile: event.target.files[0]
    });
  };

  fileUploadHandler = () => {
    if (this.state.selectedFile !== null) {
      this.props.uploadProfilePicture(this.state.selectedFile);
      this.setState({
        selectedFile: null
      });
    } else {
      window.confirm("Please select file");
    }
  };

  render() {
    let website = null;
    if (this.props.website) {
      website = (
        <a target="_blank" className="p-2" href={this.props.website}>
          <i className="fas fa-globe fa-2x" />
        </a>
      );
    }
    let facebook = null;
    if (!isEmpty(this.props.social.facebook)) {
      facebook = (
        <a className="p-2" href={this.props.social.facebook} target="_blank">
          <i className="fab fa-facebook fa-2x" />
        </a>
      );
    }

    let instagram = null;
    if (!isEmpty(this.props.social.instagram)) {
      instagram = (
        <a className="p-2" href={this.props.social.instagram} target="_blank">
          <i className="fab fa-instagram fa-2x" />
        </a>
      );
    }

    let twitter = null;
    if (!isEmpty(this.props.social.twitter)) {
      twitter = (
        <a className="p-2" href={this.props.social.twitter} target="_blank">
          <i className="fab fa-twitter fa-2x" />
        </a>
      );
    }

    let youtube = null;
    if (!isEmpty(this.props.social.youtube)) {
      youtube = (
        <a className="p-2" href={this.props.social.youtube} target="_blank">
          <i className="fab fa-youtube fa-2x" />
        </a>
      );
    }

    let linkedin = null;
    if (!isEmpty(this.props.social.linkedin)) {
      linkedin = (
        <a className="p-2" href={this.props.social.linkedin} target="_blank">
          <i className="fab fa-linkedin fa-2x" />
        </a>
      );
    }
    return (
      <div className="card card-body bg-light mb-3">
        <div className="row">
          <div className="col-3">
            <img
              className="rounded-circle"
              src={
                isEmpty(this.props.profilePicture)
                  ? "https://www.gravatar.com/avatar/anything?s=200&d=mm"
                  : `http://localhost:8000${this.props.profilePicture}`
              }
              alt=""
            />
            <br />
            {this.props.setProfilePicture ? (
              <div className="text-center">
                <input
                  type="file"
                  style={{ display: "none" }}
                  onChange={this.fileSelecedHandler}
                  ref={fileInput => (this.fileInput = fileInput)}
                />
                <button
                  className="btn btn-primary"
                  onClick={() => this.fileInput.click()}
                >
                  Pick File
                </button>
                <button
                  onClick={this.fileUploadHandler}
                  className="btn btn-success"
                >
                  Upload
                </button>
              </div>
            ) : null}
          </div>
          <div className="col-5">
            <div className="text-center">
              <h1 className="display-6 text-center">{this.props.name}</h1>
              <br />
              <p className="lead text-center">
                {this.props.status}{" "}
                {isEmpty(this.props.company) ? null : (
                  <span>at {this.props.company}</span>
                )}
              </p>
              <p>{this.props.location}</p>
              <br />
            </div>
          </div>
          <div className="col-4">
            <p>
              {website}
              {facebook}
              {instagram}
              {twitter}
              {youtube}
              {linkedin}
            </p>
          </div>
        </div>
      </div>
    );
  }
}

BusinessProfileHeader.propTypes = {
  profilePicture: PropTypes.string,
  name: PropTypes.string,
  status: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  social: PropTypes.object.isRequired,
  company: PropTypes.string.isRequired,
  website: PropTypes.string.isRequired,
  setProfilePicture: PropTypes.bool.isRequired,
  uploadProfilePicture: PropTypes.func.isRequired
};


const mapDispatchToProps = {
  uploadProfilePicture
};
export default connect(
  null,
  mapDispatchToProps
)(BusinessProfileHeader);
