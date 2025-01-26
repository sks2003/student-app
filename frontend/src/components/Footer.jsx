import React from "react";

const Footer = (props) => {
  return (
    <div className="bg-slate-800 text-white h-8">
      <div className="flex justify-center text-white text-sm items-center">
        Created by Sashwat Kumar Sahoo
      </div>
      <span className="text-green-500">{props.v}</span>
    </div>
  );
};

export default Footer;
