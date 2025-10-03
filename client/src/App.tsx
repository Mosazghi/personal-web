import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import FormLayout from "./layouts/form-layout";
import Layout from "./layouts/layout";
import NoPage from "./pages/404-page";
import Dashboard from "./pages/dashboard";
import Home from "./pages/home";
import Login from "./pages/login";
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
                    <Route path="/admin/dashboard" element={<ProtectedRoutes />}>
                        <Route path="/admin/dashboard" element={<Dashboard />} />
                    </Route>
                    <Route path="*" element={<NoPage />} />
                </Routes>
            </Layout>
        </Router>
    );
}

export default App;
