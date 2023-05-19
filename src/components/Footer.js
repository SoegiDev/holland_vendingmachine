import React from "react";
import YoutubeIcon from "../assets/img/youtube.png";
import FacebookIcon from "../assets/img/facebook.png";
import WebsiteIcon from "../assets/img/website.png";
import Instagramicon from "../assets/img/insta.png";
const Footer = () => {
  return (
    <div className="w-screen fixed bottom-4">
      <div className="flex w-full">
        <div className="flex flex-grow items-center justify-between">
          <div className="flex border-hollandtints-700 ml-4 mr-4">
            <img src={Instagramicon} alt="" className="h-10 w-10" />
            <h3 className="text-xl font-medium mx-3 p-2">@hollandbakery</h3>
          </div>
        </div>
        <div className="flex flex-grow items-center justify-between">
          <div className="flex border-hollandtints-700 mr-4">
            <img src={FacebookIcon} alt="" className="h-10 w-10" />
            <h3 className="text-xl font-medium mx-3 p-2">
              Holland Bakery Indonesia (Official)
            </h3>
          </div>
        </div>
        <div className="flex flex-grow items-center justify-between">
          <div className="flex border-hollandtints-700 mr-4">
            <img src={WebsiteIcon} alt="" className="h-10 w-10" />
            <h3 className="text-xl font-medium mx-3 p-2">
              www.hollandbakery.co.id
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
