import Sidebar from "../../components/dashboard/Sidebar";
import Topbar from "../../components/dashboard/Topbar";
import DashboardHome from "../../components/dashboard/DashboardHome";

function DashboardPage() {
  return (
    <div className="flex min-h-screen bg-slate-950 text-white">

      <Sidebar />

      <div className="flex-1">

        <Topbar />

        <DashboardHome />

      </div>

    </div>
  );
}

export default DashboardPage;