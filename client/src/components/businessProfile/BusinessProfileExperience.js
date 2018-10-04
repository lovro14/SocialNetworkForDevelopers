import React from "react";
import Moment from "react-moment";
import { isEmpty } from "../../utils";
import PropTypes from "prop-types";

const BusinessProfileExperience = props => {
  let expData = props.experience.map(exp => (
    <li key={exp._id} className="list-group-item">
      <h4>{exp.company}</h4>
      <p>
        <Moment format="YYYY/MM/DD">{exp.from}</Moment> -{" "}
        {exp.to === null ? (
          "Now"
        ) : (
          <Moment format="YYYY/MM/DD">{exp.to}</Moment>
        )}
      </p>
      <p>
        <strong>Position:</strong> {exp.title}
      </p>
      <div>
        {!isEmpty(exp.location) ? (
          <p>
            <strong>Location: </strong> {exp.location}
          </p>
        ) : null}
        <strong>Description:</strong> {exp.description}
      </div>
    </li>
  ));
  return (
    <div className="row">
      <div className="col-md-12">
        <h3 className="text-info">Experience</h3>
        <ul className="list-group">{expData}</ul>
      </div>
    </div>
  );
};

BusinessProfileExperience.propTypes = {
  experience: PropTypes.array.isRequired
};

export default BusinessProfileExperience;
