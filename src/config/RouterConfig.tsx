import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Auth from "../pages/Auth";
import ProtectedRoute from "../components/ProtectedRoute";
import MainLayout from "../components/MainLayout";

function RouterConfig() {
    return (
        <Routes>
            <Route element={<MainLayout />}>
                <Route
                    path="/"
                    element={
                        <ProtectedRoute>
                            <Home />
                        </ProtectedRoute>
                    }
                />
            </Route>
            <Route path="/auth" element={<Auth />} />
        </Routes>
    );
}

export default RouterConfig;
