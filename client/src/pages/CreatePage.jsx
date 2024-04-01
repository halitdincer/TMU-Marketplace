import React from "react";
import Sidebar from "components/Sidebar";
import Header from "components/Header";
import CreateAdForm from "components/CreateAdForm";

function CreatePage({ onAdSubmit }) {
  return (
    <div className="flex ">
      <div className="fixed left-0 top-0 h-full">
        <Sidebar />
      </div>
      <div className="flex-1 overflow-y-auto lg:ml-20 ml-0">
        <CreateAdForm />
      </div>
    </div>
  );
}

export default CreatePage;
