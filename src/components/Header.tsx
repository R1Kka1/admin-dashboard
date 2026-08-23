import "./Header.css";
import { getCurrentUser } from "../untils/auth";
import { Dispatch, SetStateAction } from "react";
interface HeaderProps{
    collapsed:boolean;
    setCollapsed:Dispatch<SetStateAction<boolean>>;
}
export function Header({collapsed,setCollapsed}:HeaderProps) {
    const user= getCurrentUser();

    return (
        <div className="header-content">
            <button onClick={() => setCollapsed(!collapsed)}>
                {collapsed ? "»" : "«"}
            </button>
            <div className="header-title">
            ADMIN DASHBOARD
            </div>

            <div className="header-user">
                👤{user?.username}
            </div>
        </div>
    );
}