import { Navigate } from "react-router-dom";
import LoginForm from "../components/Form/LoginForm";
import cookies from "../utils/cookies";

function Login() {
    if (cookies.get("TOKEN")) {
        return <Navigate to="/admin/adminDashboard" />;
    }

    return (
        <>
            <h1 className="text-center text-4xl md:text-6xl mb-5">Dashboard</h1>
            <LoginForm />
        </>
    );
}

export default Login;
