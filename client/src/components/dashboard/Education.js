import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { deleteEducation } from "../../store/actions";
import Moment from "react-moment";

class Education extends Component {
  onDeleteClick = id => {
    this.props.deleteEducation(id);
  };

  render() {
    return (
      <div>
        <h4 className="mb-2">Education Credentials</h4>
        <table className="table">
          <thead>
            <tr>
              <th>College</th>
              <th>Degree</th>
              <th>Years</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {this.props.education.map(edu => (
              <tr key={edu._id}>
                <td>{edu.collegeName}</td>
                <td>{edu.degree}</td>
                <td>
                  <Moment format="YYYY/MM/DD">{edu.from}</Moment> -{" "}
                  {edu.to === null ? (
                    "Now"
                  ) : (
                    <Moment format="YYYY/MM/DD">{edu.to}</Moment>
                  )}
                </td>
                <td>
                  <button
                    onClick={() => this.onDeleteClick(edu._id)}
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

Education.propTypes = {
  deleteEducation: PropTypes.func.isRequired,
  education: PropTypes.array.isRequired
};

const mapDispatchToProps = {
  deleteEducation
};

export default connect(
  null,
  mapDispatchToProps
)(Education);
