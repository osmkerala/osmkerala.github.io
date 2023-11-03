import React from "react";

export default function NavbarButton({ isMobile, text, link }) {
  return (
    <a
      href={link}
      className={`${
        isMobile
          ? "bg-transparent font-bold  hover:bg-white rounded-lg hover:text-[#1a1d20]  active:bg-gray-600"
          : "hover:bg-[#09471a] rounded-lg hover:text-white active:bg-gray-600"
      } focus:outline-none focus:ring focus:ring-gray-300 p-2`}
    >
      {text}
    </a>
  );
}
