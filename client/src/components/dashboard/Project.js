import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { deleteProject } from "../../store/actions";
import Moment from "react-moment";

class Project extends Component {
  onDeleteClick = id => {
    this.props.deleteProject(id);
  };

  render() {
    return (
      <div>
        <h4 className="mb-2">Projects</h4>
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Role</th>
              <th>Years</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {this.props.projects.map(project => (
              <tr key={project._id}>
                <td>{project.title}</td>
                <td>{project.role}</td>
                <td>
                  <Moment format="YYYY/MM/DD">{project.from}</Moment> -{" "}
                  <Moment format="YYYY/MM/DD">{project.to}</Moment>
                </td>
                <td>
                  <button
                    onClick={() => this.onDeleteClick(project._id)}
                    className="btn btn-danger"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

Project.propTypes = {
  deleteProject: PropTypes.func.isRequired,
  projects: PropTypes.array.isRequired
};

const mapDispatchToProps = {
  deleteProject
};

export default connect(
  null,
  mapDispatchToProps
)(Project);
