import React from "react";
import PropTypes from "prop-types";

const BusinessProfileAbout = props => {
  return (
    <div className="row">
      <div className="col-md-12">
        <div className="card card-body bg-light mb-3">
          <h3 className="text-center text-info">
            {props.identityName}
            's Bio
          </h3>
          <p className="lead">{props.bio}</p>
          <hr />
          <h3 className="text-center text-info">Skill Set</h3>
          <div className="row">
            <div className="d-flex flex-wrap justify-content-center align-items-center">
              {props.skills.map((skill, index) => (
                <div key={index} className="p-3">
                  <i className="fa fa-check" /> {skill}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

BusinessProfileAbout.propTypes = {
  identityName: PropTypes.string.isRequired,
  bio: PropTypes.string.isRequired,
  skills: PropTypes.array.isRequired
};

export default BusinessProfileAbout;
