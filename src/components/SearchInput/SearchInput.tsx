import type { ChangeEvent } from "react";

import "./SearchInput.scss";

type SearchInputProps = {
  onSearch: (query: string) => void;
  className?: string;
};

export default function SearchInput({ onSearch }: SearchInputProps) {
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    onSearch(event.target.value);
  };

  return (
    <input
      className="search-input"
      type="text"
      placeholder="Search..."
      onChange={handleInputChange}
      aria-label="Search for products"
    />
  );
}
