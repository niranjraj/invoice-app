import React, { useState, useRef, useEffect } from "react";
import Button from "../shared/Button";
import DropdownOption from "./DropdownOption";
import "./Dropdown.css";
function Dropdown({setFilterStatus}) {
  const downArrow = <i className="fas fa-angle-down"></i>;
  const upArrow = (
    <i
      className="fas fa-angle-down"
      style={{ transform: "rotate(-180deg)" }}
    ></i>
  );
  const buttonRef = useRef();
  const dropdownRef = useRef();
  const [open, setOpen] = useState(false);

  const [options, setOptions] = useState([
    {
      id: 0,
      value: "paid",
      checked: false,
    },
    {
      id: 1,
      value: "pending",
      checked: false,
    },
    {
      id: 2,
      value: "draft",
      checked: false,
    },
  ]);
  const toggleClick = () => {
    setOpen((prev) => !prev);
  };

  const handleCheck = (id) => {
    const updatedOptions = options.map((option) => {
      if (id === option.id) {
        // option.checked is false for the  checked id
        setFilterStatus(option.checked? null:option.value);
        return { ...option, checked: !option.checked };
      }
      return { ...option, checked: false };
    });

    setOptions(updatedOptions);
  };

  const handleClickOutside = (e) => {
    if (
      !dropdownRef.current.contains(e.target) &&
      !buttonRef.current.contains(e.target)
    ) {
      setOpen(false);
    }
  };

  useEffect(() => {
    if (dropdownRef.current.classList.contains("isActive")) {
      document.addEventListener("mousedown", handleClickOutside);

      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  });

  return (
    <div className="dropdown-wrapper">
      <Button
        buttonStyle="header-dropdown"
        forwardedRef={buttonRef}
        iconValue={open ? upArrow : downArrow}
        onClick={toggleClick}
      >
        <h4>
          Filter <span>by status</span>
        </h4>
      </Button>
      <div
        ref={dropdownRef}
        className={open ? "isActive" : "dropdown-options-container"}
      >
        {options.map((option) => {
          return (
            <DropdownOption
              key={option.id}
              handleClick={handleCheck}
              id={option.id}
              checked={option.checked}
            >
              {option.value}
            </DropdownOption>
          );
        })}
      </div>
    </div>
  );
}

export default Dropdown;
