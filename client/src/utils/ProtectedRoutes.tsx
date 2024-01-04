import { Navigate, Outlet } from "react-router-dom";
import cookies from "./cookies";

export default function ProtectedRoutes() {
    const token = cookies.get("TOKEN");
    return token ? <Outlet /> : <Navigate to="/admin/login" />;
}
