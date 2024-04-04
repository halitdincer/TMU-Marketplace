import React from "react";
import Sidebar from "components/Sidebar";
import Report from "components/Report";

function ReportPage({ onAdSubmit }) {
  return (
    <div className="flex ">
      <div className="fixed left-0 top-0 h-full">
        <Sidebar />
      </div>
      <div className="flex-1 overflow-y-auto lg:ml-28 ml-0">
        <Report />
      </div>
    </div>
  );
}

export default ReportPage;
