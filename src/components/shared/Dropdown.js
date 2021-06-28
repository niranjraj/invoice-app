import React, { useState, useRef, useEffect } from "react";
import Button from "./Button";
import DropdownOption from "./DropdownOption";
import "./Dropdown.css";
function Dropdown() {
  const downArrow = <i className="fas fa-angle-down"></i>;
  const upArrow = (
    <i
      className="fas fa-angle-down"
      style={{ transform: "rotate(-180deg)" }}
    ></i>
  );
  const dropdown = useRef();
  const [open, setOpen] = useState(false);
  console.log("button");
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
      console.log(id)
    setOptions([...options].map(option =>{if(id===option.id){
        return{...option,checked:!option.checked}
    }else return {...option,checked:false}
}));
    console.log(options);
  };

  const handleClickOutside = (e) => {
    if (!dropdown.current.contains(e.target)) {
      setOpen(false);
    }
  };

  useEffect(() => {
    if (dropdown.current.classList.contains("isActive")) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  });

  return (
    <div className="dropdown-wrapper">
      <Button
        type="button"
        buttonStyle="header-dropdown"
        buttonSize="medium"
        iconValue={open ? upArrow : downArrow}
        onClick={toggleClick}
      >
        <h4>
          Filter <span>by status</span>
        </h4>
      </Button>
      <div
        ref={dropdown}
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
