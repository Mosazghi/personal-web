import { Home, LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "~/components/ui/button";
import AdminPanel from "../components/Admin/admin-panel";
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
                <h1 className=" text-[2.5rem] md:text-[4rem] text-center">Dashboard</h1>
                <div className="min-w-[80px]">
                    <Button variant={"ghost"} size={"icon"} asChild>
                        <Link to="/">
                            <Home />
                        </Link>
                    </Button>
                    <Button variant={"ghost"} size={"icon"} onClick={handleLogout} className="p-2">
                        <LogOut />
                    </Button>
                </div>
            </div>
            <AdminPanel />
        </div>
    );
}

export default Dashboard;
