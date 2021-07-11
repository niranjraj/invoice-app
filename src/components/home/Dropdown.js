import React, { useState, useRef, useEffect } from "react";
import Button from "../shared/Button";
import DropdownOption from "./DropdownOption";
import "./Dropdown.css";
import downArrow from "../../assets/images/down-arrow.svg";

const statusOption = [
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
];

const Dropdown = React.memo(({ setFilterStatus }) => {
  const buttonRef = useRef();
  const dropdownRef = useRef();

  const [openDropdown, setOpenDropdown] = useState(false);

  const [options, setOptions] = useState(statusOption);

  const toggleClick = () => {
    // open and close the dropdown
    setOpenDropdown((prev) => !prev);
  };

  const handleCheck = (id) => {
    const updatedOptions = options.map((option) => {
      //change the clicked option to true and the rest to false
      if (id === option.id) {
        // option.checked is false for the  checked id
        setFilterStatus(option.checked ? null : option.value);
        return { ...option, checked: !option.checked };
      }
      return { ...option, checked: false };
    });

    setOptions(updatedOptions);
  };

  const handleClickOutside = (e) => {
    //close the dropdown if click is outside the dropdown and not on the button
    if (
      !dropdownRef.current.contains(e.target) &&
      !buttonRef.current.contains(e.target)
    ) {
      setOpenDropdown(false);
    }
  };

  useEffect(() => {
    //add listener when drop down is open
    if (openDropdown) {
      document.addEventListener("mousedown", handleClickOutside);

      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [openDropdown]);

  return (
    <div className="dropdown-wrapper">
      <Button
        buttonStyle={`header-dropdown ${openDropdown ? "arrow-up" : ""}`}
        forwardedRef={buttonRef}
        iconValue={downArrow}
        altValue="downArrow"
        onClick={toggleClick}
      >
        <h1>
          Filter <span>by status</span>
        </h1>
      </Button>
      <div
        ref={dropdownRef}
        className={openDropdown ? "isActive" : "dropdown-options-container"}
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
});

export default Dropdown;
