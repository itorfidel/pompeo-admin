import React, { useRef, useState } from "react";
import { UserProps } from "../services/types";
import StyledSelect from "./styled/Select";
import { KeyboardArrowDown } from "@mui/icons-material";
import useClosePopup from "../hooks/closePopup";

interface Props {
  style?: React.CSSProperties;
  defaultValue?: boolean;
  setBody: React.Dispatch<React.SetStateAction<UserProps>>;
}

const Select = ({ style, defaultValue, setBody }: Props) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const defaultRef = useRef<HTMLSpanElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleToggleDropdown = () => {
    setIsDropdownOpen((state) => !state);
  };

  const handleSelect = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    const eventTarget = e.target as HTMLElement;
    const eventTargetValue = eventTarget.dataset.value;

    if (eventTarget === defaultRef.current) {
      handleToggleDropdown();
    } else if (
      defaultRef.current &&
      dropdownRef.current?.contains(eventTarget)
    ) {
      if (eventTargetValue) {
        defaultRef.current.innerText = eventTargetValue;
        setBody((state) => ({
          ...state,
          isAdmin: JSON.parse(eventTargetValue),
        }));
        setIsDropdownOpen(false);
      }
    }
  };

  useClosePopup(setIsDropdownOpen, dropdownRef, defaultRef);

  return (
    <div style={{ ...style }}>
      <label>IsAdmin</label>

      <StyledSelect onClick={handleSelect}>
        <span className="default" ref={defaultRef}>
          {defaultValue?.toString() || "false"}
        </span>
        <KeyboardArrowDown
          className={`arrowIcon ${isDropdownOpen ? "transform" : ""}`}
        />
        <div
          ref={dropdownRef}
          className={`dropdown ${isDropdownOpen ? "show" : ""}`}
        >
          <span data-value={true}>true</span>
          <span data-value={false}>false</span>
        </div>
      </StyledSelect>
    </div>
  );
};

export default Select;
