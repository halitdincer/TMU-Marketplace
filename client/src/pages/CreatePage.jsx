import React from "react";
import Sidebar from "components/Sidebar";
import Header from "components/Header";
import CreateAdForm from "components/CreateAdForm";

function CreatePage({ onAdSubmit }) {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <CreateAdForm />
      </div>
    </div>
  );
}

export default CreatePage;
