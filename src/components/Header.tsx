import "./Header.css";
import { getCurrentUser } from "../untils/auth";

export function Header() {
    const user= getCurrentUser();

    return (
        <div className="header-content">
            <div className="header-title">
            ADMIN DASHBOARD
            </div>

            <div className="header-user">
                👤{user?.username}
            </div>
        </div>
    );
}