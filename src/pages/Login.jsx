import { useState } from "react";
import './Login.css'
import { useNavigate } from "react-router-dom";
import { addLog } from "../untils/log";
import { useUsers } from "../hooks/useUsers";

export function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const { users} = useUsers();

    const navigate = useNavigate();



    function handleLogin(users) {

        const user = users.find((user) => {

            return (
                username === user.username &&
                password === user.password
            );

        });
        if (user) {
            const { password: _ , ...safeUser} = user;


            localStorage.setItem("user", JSON.stringify(safeUser));
            addLog({
                operator: username,
                action: "登录系统",
                target: "-",
                detail: "管理员登录后台"
            });
            navigate("/homepage");
        } else {
            alert("登录失败");
        }
    }

    return (
        <div className="login">
            <h1>Login</h1>

            <form
                onSubmit={async (e) => {
                    e.preventDefault();

                    handleLogin(users);
                }}
            >
                <input
                    placeholder="Username"
                    value={username}
                    onChange={(e) => {
                        setUsername(e.target.value);
                    }}
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => {
                        setPassword(e.target.value);
                    }}
                />

                <button type="submit">
                    Login
                </button>
            </form>
        </div>
    );
}