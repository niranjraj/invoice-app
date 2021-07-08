import React from "react";
import check from "../../assets/images/icon-check.svg"
import "./DropdownOption.css";

const DropdownOption = ({ checked, id, children, handleClick }) => {
  return (
    <label className="dropdown-option">
      <input
        className="input-options"
        type="checkbox"
        checked={checked}
        onChange={() => {
          handleClick(id);
        }}
      />
      <span className="checkbox">
      <img src={check} alt="check" />
      </span>
      <span className="label-option">{children}</span>
    </label>
  );
};

export default DropdownOption;
