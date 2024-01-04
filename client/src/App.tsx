import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import FormLayout from "./layouts/FormLayout";
import Layout from "./layouts/Layout";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Login from "./pages/Login";
import NoPage from "./pages/NoPage";
import ProtectedRoutes from "./utils/ProtectedRoutes";

function App() {
    return (
        <Router>
            <Layout>
                <Routes>
                    <Route index path="/" element={<Home />} />
                    <Route
                        path="/admin/login"
                        element={
                            <FormLayout>
                                <Login />
                            </FormLayout>
                        }
                    />
                    <Route path="/admin/adminDashboard" element={<ProtectedRoutes />}>
                        <Route
                            path="/admin/adminDashboard"
                            element={
                                <FormLayout>
                                    <Dashboard />
                                </FormLayout>
                            }
                        />
                    </Route>
                    <Route path="*" element={<NoPage />} />
                </Routes>
            </Layout>
        </Router>
    );
}

export default App;
