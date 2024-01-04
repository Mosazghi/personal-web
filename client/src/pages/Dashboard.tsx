import { useNavigate } from "react-router-dom";
import CreateCourse from "../components/Form/CreateCourseForm";
import cookies from "../utils/cookies";

function Dashboard() {
    const navigate = useNavigate();
    const handleLogout = () => {
        cookies.remove("TOKEN", { path: "/" });
        navigate("/");
    };

    return (
        <div className="text-white">
            <h1 className="text-center text-4xl md:text-6xl mb-5">Dashboard</h1>
            <CreateCourse />
            <button onClick={handleLogout} className="ms-56 text-gray-300 underline">
                Logout
            </button>
        </div>
    );
}

export default Dashboard;
