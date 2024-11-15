import { useState, useRef, useEffect } from "react";

import ArrowDown from "@/assets/svg/arrow-down.svg?react";

import "./Dropdown.scss";

export type Option = {
  identifier: string;
  label: string;
};

interface DropdownProps {
  label: string;
  options: Option[];
  onSelect: (option: Option) => void;
}

const INITIAL_OPTION: Option = {
  identifier: "all",
  label: "Pokaż wszystkie",
};

export default function Dropdown({ label, options, onSelect }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<Option>(INITIAL_OPTION);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleToggleDropdown = () => setIsOpen(!isOpen);

  const handleOptionSelect = (option: Option) => {
    setSelectedOption(option);
    onSelect(option);
    setIsOpen(false);
  };

  const handleClickOutside = (event: MouseEvent | TouchEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, []);

  return (
    <div className="dropdown" ref={dropdownRef}>
      <h4 className="dropdown__label">{label}:</h4>
      <div className="dropdown__container">
        <button
          className="dropdown__button"
          onClick={handleToggleDropdown}
          aria-haspopup="true"
          aria-expanded={isOpen}
        >
          {selectedOption.label}
          <ArrowDown />
        </button>
        {isOpen && (
          <ul className="dropdown__menu" role="menu">
            <li
              className="dropdown__menu-item"
              role="menuitem"
              onClick={() => handleOptionSelect(INITIAL_OPTION)}
            >
              Pokaż wszystkie
            </li>
            {options.map((option, index) => (
              <li
                key={index}
                className="dropdown__menu-item"
                role="menuitem"
                onClick={() => handleOptionSelect(option)}
              >
                {option.label}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
