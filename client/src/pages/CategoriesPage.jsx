import React, { useContext } from "react";
import Header from "components/Header";
import Sidebar from "components/Sidebar";
import CategoryGrid from "components/CategoryGrid";
import { AuthContext } from "components/AuthProvider";
import HeaderLoggedIn from "components/HeaderLoggedIn";

function CategoriesPage() {
  const { userData } = useContext(AuthContext);
  return (
    <div className="flex">
      <Sidebar />
      <div class="flex-1 lg:ml-28">
        {userData ? <HeaderLoggedIn /> : <Header />}
        <div className="bg-white py-6 sm:py-6">
          {/* Page content here */}
          <CategoryGrid></CategoryGrid>
        </div>
      </div>
    </div>
  );
}

export default CategoriesPage;
