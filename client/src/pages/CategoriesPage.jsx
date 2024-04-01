import React from "react";
import Header from "components/Header";
import Sidebar from "components/Sidebar";
import CategoryGrid from "components/CategoryGrid";

function CategoriesPage() {
  return (
    <div className="flex">
      <Sidebar />
      <div class="flex-1 sm:ml-28">
        <Header />

        {/* Page content here */}
        <CategoryGrid></CategoryGrid>
      </div>
    </div>
  );
}

export default CategoriesPage;
