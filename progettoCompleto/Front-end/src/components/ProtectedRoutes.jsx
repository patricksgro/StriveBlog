import { Navigate } from "react-router-dom";
import { useAuthContext } from "../../context/authContext";

export function ProtectedRoute({ children }) {
    const { token } = useAuthContext();

    if (!token) {

        return <Navigate to="/loginRegister" replace />;
    }

    return children;
}
