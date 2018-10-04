import React from "react";
import Moment from "react-moment";
import PropTypes from "prop-types";

const BusinessProfileEducation = props => {
  let eduData = props.education.map(edu => (
    <li key={edu._id} className="list-group-item">
      <h4>{edu.collegeName}</h4>
      <p>
        <Moment format="YYYY/MM/DD">{edu.from}</Moment> -{" "}
        {edu.to === null ? (
          "Now"
        ) : (
          <Moment format="YYYY/MM/DD">{edu.to}</Moment>
        )}
      </p>
      <p>
        <strong>Degree: </strong>
        {edu.degree}
      </p>
      <p>
        <strong>Field Of Study: </strong>
        {edu.fieldOfStudy}
      </p>
      <p>
        <strong>Description:</strong> {edu.description}
      </p>
    </li>
  ));

  return (
    <div className="row">
      <div className="col-md-12">
        <h3 className="text-info">Education</h3>
        <ul className="list-group">{eduData}</ul>
      </div>
    </div>
  );
};

BusinessProfileEducation.propTypes = {
  education: PropTypes.array.isRequired
};

export default BusinessProfileEducation;
