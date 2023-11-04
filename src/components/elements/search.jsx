import { useEffect, useState } from "react";
export default function SearchBar() {
  const [value, setValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  return (
    <input
      type="text"
      className="bg-transparent p-2 m-2 rounded-lg  border-2 border-black w-[70%]"
      placeholder="Search data..."
      value={value}
      onChange={(e) => {
        setValue(e.target.value);
      }}
    />
  );
}
