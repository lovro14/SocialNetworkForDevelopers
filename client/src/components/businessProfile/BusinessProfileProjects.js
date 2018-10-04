import React from "react";
import Moment from "react-moment";
import PropTypes from "prop-types";

const BusinessProfileProjects = props => {
  let projectData = props.projects.map(project => (
    <li key={project._id} className="list-group-item">
      <h4>{project.title}</h4>
      <p>
        <Moment format="YYYY/MM/DD">{project.from}</Moment> -{" "}
        <Moment format="YYYY/MM/DD">{project.to}</Moment>
      </p>
      <p>
        <strong>Summary:</strong> {project.projectSummary}
      </p>
      <p>
        <strong>Role:</strong> {project.role}
      </p>
      <p>
        <strong>Contribution:</strong> {project.contribution}
      </p>
      <p>
        <strong>Technologies:</strong> {project.technologies}
      </p>
    </li>
  ));

  return (
    <div className="row">
      <div className="col-md-12">
        <h3 className="text-info">Projects</h3>
        <ul className="list-group">{projectData}</ul>
      </div>
    </div>
  );
};

BusinessProfileProjects.propTypes = {
  projects: PropTypes.array.isRequired
};

export default BusinessProfileProjects;
