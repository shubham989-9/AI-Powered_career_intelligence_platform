import { Outlet } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";

function AdminLayout() {

  return (

    <div className="
      flex
      min-h-screen
      bg-[#050816]
      text-white
    ">

      <AdminSidebar />

      <main className="
        ml-[290px]
        min-w-0
        flex-1
      ">

        <Outlet />

      </main>

    </div>

  );

}

export default AdminLayout;