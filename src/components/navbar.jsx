import { useState } from "react";
import NavbarButton from "./NavbarButton";
export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <nav>
        <div className="border-2  border-[#E6E9ED];">
          <div className="m-2 p-2 container mx-auto">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <div>
                  <img src="/osmkerala.png" alt="logo" width={100} />
                </div>
                <a href="/">
                  <div className="text-3xl font-bold">OSM Kerala</div>
                </a>
              </div>
              <div className="hidden text-[#2b2b2b] font-semibold md:flex space-x-4">
                {/* Add your navigation links here */}
                <NavbarButton isMobile={false} link="/" text="HOME" />
                <NavbarButton isMobile={false} link="/about" text="ABOUT US" />
                <NavbarButton
                  isMobile={false}
                  link="/community"
                  text="COMMUNITY"
                />
                <NavbarButton isMobile={false} link="/blogs" text="BLOGS" />
                <NavbarButton
                  isMobile={false}
                  link="/maintainers"
                  text="MAINTAINERS"
                />
              </div>
              <div className="md:hidden">
                <button
                  onClick={toggleNavbar}
                  className="text-[#2C3136] p-2 m-2 hover:text-gray-300"
                >
                  {isOpen ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-black"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-black "
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 6h16M4 12h16M4 18h16"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>
          {isOpen && (
            <div className="absolute top-13 right-5  text-semiblod flex-col text-right w-fit justify-self-end rounded-lg bg-[#09471a] text-[#ffffff]">
              {/* Add your mobile navigation links here */}
              <div className="m-2 p-2 mr-8">
                <NavbarButton isMobile={true} link="/" text="HOME" />
              </div>
              <div className="m-2 p-2 mr-8">
                <NavbarButton isMobile={true} link="/blogs" text="BLOGS" />
              </div>
              <div className="m-2 p-2 mr-8">
                <NavbarButton isMobile={true} link="/about" text="ABOUT US" />
              </div>

              <div className="m-2 p-2 mr-8">
                <NavbarButton
                  isMobile={true}
                  link="/community"
                  text="COMMUNITY"
                />
              </div>
              <div className="m-2 p-2 mr-8">
                <NavbarButton
                  isMobile={true}
                  link="/maintainers"
                  text="MAINTAINERS"
                />
              </div>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
}
