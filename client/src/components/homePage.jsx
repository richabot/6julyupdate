import React, { useState } from "react";
import { useSelector } from "react-redux";
import "../styles/homepage.css";

import ProfileUpdate from "./ProfileUpdate";
import Setup from "./Setup";
import ProfileSeting from "./ProfileSeting";

const HomePage = ({ user }) => {

  const [activeComponent, setActiveComponent] = useState(null);



  const handleLinkClick = (component) => {
    setActiveComponent(component);
  };

  const componentsMap = {
    Profile: ProfileSeting,
    Overview: Setup,
    // Add more components and their corresponding links here
  };
  return (
    <div className="d-flex" id="wrapper">
      <div className="border-end bg-white" id="sidebar-wrapper">
        <div className="sidebar-heading border-bottom bg-light">Start Bootstrap</div>
        <div className="list-group list-group-flush">
          {Object.keys(componentsMap).map((componentName) => (
            <a
              key={componentName}
              className="list-group-item list-group-item-action list-group-item-light p-3"
              href="#!"
              onClick={() => handleLinkClick(componentName)}
            >
              {componentName}
            </a>
          ))}
        </div>
      </div>

      <div id="page-content-wrapper">
        {activeComponent && React.createElement(componentsMap[activeComponent])}
      </div>
    </div>
  );
};

export default HomePage;
