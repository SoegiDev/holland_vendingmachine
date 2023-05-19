import React from "react";
import Logo from "../assets/logo/logo_holland.png";
import Logo2 from "../assets/img/selforder.png";

const Header = () => {
  return (
    <div className="w-screen">
      <div className="flex w-full">
        <div className="flex flex-grow items-center justify-between">
          <div className="flex items-center">
            <img src={Logo} alt="" className="h-32 w-full" />
          </div>
          <div className="flex items-center pl-2 pr-2 m-1">
            <span className="overflow-hidden">
              <img src={Logo2} alt="" className="h-30 w-full" />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
