import { Navigate } from "react-router-dom";
import { getCurrentUser } from "../untils/auth";
import type { ReactNode } from "react";

interface RoleRouteProps{
    children: ReactNode;
    roles:("管理员" | "超级管理员")[];
}
export function RoleRoute({ children, roles }:RoleRouteProps) {

    const user = getCurrentUser();

    if (!user) {
        return <Navigate to="/" replace />;
    }

    const allowRoles = roles;

    if (!allowRoles.includes(user.role as "管理员" | "超级管理员")) {
        return <Navigate to="/admin/products" replace />;
    }

    return children;
}