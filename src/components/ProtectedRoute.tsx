import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../redux/store";

interface ProtectedRouteProps {
    children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    const isLoggedIn = useSelector((state: RootState) => state.session.isLoggedIn);
    // console.log("ProtectedRoute - isLoggedIn:", isLoggedIn);

    if (!isLoggedIn) {
        return <Navigate to="/auth" replace />;
    }
    return children;
};

export default ProtectedRoute;
