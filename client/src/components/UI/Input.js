import React from "react";
import classnames from "classnames";
import PropTypes from "prop-types";
import {
  INPUT,
  INPUT_GROUP,
  SELECT,
  TEXT_AREA,
  CHECK_BOX
} from "../../element-type-constants";

const Input = props => {
  let inputElement = null;
  switch (props.elementType) {
    case INPUT:
      inputElement = (
        <input
          type={props.type}
          className={classnames("form-control form-control-lg", {
            "is-invalid": props.error
          })}
          placeholder={props.placeholder}
          name={props.name}
          value={props.value}
          onChange={props.onChange}
          disabled={props.disabled}
        />
      );
      break;
    case INPUT_GROUP:
      inputElement = (
        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text">
              <i className={props.icon} />
            </span>
          </div>
          <input
            type={props.text}
            className="form-control form-control-lg"
            placeholder={props.placeholder}
            name={props.name}
            value={props.value}
            onChange={props.onChange}
          />
        </div>
      );
      break;
    case SELECT:
      inputElement = (
        <select
          className={classnames("form-control form-control-lg", {
            "is-invalid": props.error
          })}
          name={props.name}
          value={props.value}
          onChange={props.onChange}
        >
          {props.selectOptions.map(selectOption => (
            <option key={selectOption.value} value={selectOption.value}>
              {selectOption.displayValue}
            </option>
          ))}
        </select>
      );
      break;
    case TEXT_AREA:
      inputElement = (
        <textarea
          className={classnames("form-control form-control-lg", {
            "is-invalid": props.error
          })}
          placeholder={props.placeholder}
          name={props.name}
          value={props.value}
          onChange={props.onChange}
        />
      );
      break;
    case CHECK_BOX:
      inputElement = (
        <input
          className="form-check-input"
          type={props.type}
          name={props.name}
          value={props.value}
          id={props.id}
          checked={props.checked}
          onChange={props.onChange}
        />
      );
      break;
    default:
      inputElement = null;
  }
  return (
    <div className="form-group">
      {inputElement}
      {props.info ? (
        <small className="form-text text-muted">{props.info}</small>
      ) : null}
      {props.error ? (
        <div className="invalid-feedback">{props.error}</div>
      ) : null}
    </div>
  );
};

Input.propTypes = {
  elementType: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  error: PropTypes.string,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  info: PropTypes.string,
  socialType: PropTypes.string,
  icon: PropTypes.string,
  id: PropTypes.string,
  disabled: PropTypes.string
};

export default Input;
