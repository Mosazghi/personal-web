import CssBaseline from "@mui/material/CssBaseline";
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
        <CssBaseline>
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
        </CssBaseline>
    );
}

export default App;
