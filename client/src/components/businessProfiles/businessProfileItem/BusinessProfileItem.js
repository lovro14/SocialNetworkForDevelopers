import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { isEmpty } from "../../../utils";

const BusinessProfileItem = props => {
  const { businessProfile } = props;
  return (
    <div className="card card-body bg-light mb-3">
      <div className="row">
        <div className="col-2">
          <img
            className="rounded-circle image-thumbnail"
            src={
              isEmpty(businessProfile.userId.profilePicture)
                ? "https://www.gravatar.com/avatar/anything?s=200&d=mm"
                : `http://localhost:8000${businessProfile.userId.profilePicture}`
            }
            alt=""
          />
        </div>
        <div className="col-lg-6 col-md-4 col-8">
          <h3>{businessProfile.userId.name}</h3>
          <p>
            {businessProfile.status}{" "}
            {isEmpty(businessProfile.company) ? null : (
              <span>at {businessProfile.company}</span>
            )}
          </p>
          <p>
            {isEmpty(businessProfile.location) ? null : (
              <span>{businessProfile.location}</span>
            )}
          </p>
          <Link
            to={`/business-profile/${businessProfile.identityName}`}
            className="btn btn-info"
          >
            View Profile
          </Link>
        </div>
        <div className="col-md-4 d-none d-lg-block">
          <h4>Skill Set</h4>
          <ul className="list-group">
            {businessProfile.skills.slice(0, 4).map((skill, index) => (
              <li key={index} className="list-group-item">
                <i className="fa fa-check pr-1" />
                {skill}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

BusinessProfileItem.propTypes = {
  businessProfile: PropTypes.object.isRequired
};

export default BusinessProfileItem;
