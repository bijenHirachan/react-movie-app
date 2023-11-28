import React, { useState } from "react";

const SwitchTabs = ({ data, onTabChange }) => {
  const [selectedTab, setSelectedTab] = useState(0);

  const activeTab = (tab, index) => {
    setSelectedTab(index);
    onTabChange(tab, index);
  };

  return (
    <div className="flex bg-primary rounded-full">
      {data.map((tab, index) => (
        <button
          key={index}
          onClick={() => activeTab(tab, index)}
          className={`${
            selectedTab === index
              ? "text-primary bg-beige"
              : "bg-primary text-beige"
          }  px-4 py-1 font-semibold font-outfit rounded-full transition-all delay-100`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

export default SwitchTabs;
