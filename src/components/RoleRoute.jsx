import { Navigate } from "react-router-dom";
import { getCurrentUser } from "../untils/auth";

export function RoleRoute({ children, roles }) {
    const user = getCurrentUser();

    if (!user) {
        return <Navigate to="/" replace />;
    }

    const allowRoles = Array.isArray(roles) ? roles : [roles];

    if (!allowRoles.includes(user.role)) {
        return <Navigate to="/admin/products" replace />;
    }

    return children;
}