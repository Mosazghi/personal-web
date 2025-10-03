import { Home, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import AdminPanel from "../components/Admin/AdminPanel";
import cookies from "../utils/cookies";

function Dashboard() {
    const navigate = useNavigate();
    const handleLogout = () => {
        cookies.remove("TOKEN", { path: "/" });
        navigate("/");
    };

    return (
        <div className="py-2">
            <div className="flex justify-between items-center mb-5">
                <h1 className="text-white text-[2.5rem] md:text-[4rem] text-center">Dashboard</h1>
                <div className="min-w-[80px]">
                    <a href="/" className="p-2 inline-block">
                        <Home className="h-6 w-6 text-white" />
                    </a>
                    <button onClick={handleLogout} className="p-2 inline-block">
                        <LogOut className="h-6 w-6 text-white" />
                    </button>
                </div>
            </div>
            <AdminPanel />
        </div>
    );
}

export default Dashboard;
