import React from "react";
import Characters from "../tabs/Characters";
import General from "../tabs/General";
import Teams from "../tabs/Teams";
import "../style/css/pages/settings.scss";

const Settings = () => {
  const [activeTab, setActiveTab] = React.useState("General");

  const handleTabClick = (tab) => {
    console.log(tab.target.innerText);

    setActiveTab(tab.target.innerText);
  };

  return (
    <div className="settings">
      <span className="title">Settings</span>
      <div className="tabs">
        <div
          className={activeTab === "General" ? "tab active-tab" : "tab"}
          onClick={handleTabClick}
        >
          General
        </div>
        <div
          className={activeTab === "Characters" ? "tab active-tab" : "tab"}
          onClick={handleTabClick}
        >
          Characters
        </div>
        <div
          className={activeTab === "Teams" ? "tab active-tab" : "tab"}
          onClick={handleTabClick}
        >
          Teams
        </div>
      </div>
      <div className="content">
        {activeTab === "General" && <General />}
        {activeTab === "Characters" && <Characters />}
        {activeTab === "Teams" && <Teams />}
      </div>
    </div>
  );
};

export default Settings;
