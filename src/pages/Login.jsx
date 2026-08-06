import { useState } from "react";
import './Login.css'
import { useNavigate } from "react-router-dom";
import { getList } from "../api/api";
import { addLog } from "../untils/log";


export function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    async function loadUsers() {
        const response = await getList("/users");
        return response.data;
    }

    function handleLogin(users) {

        const user = users.find((user) => {

            return (
                username === user.username &&
                password === user.password
            );

        });
        if (user) {
            localStorage.setItem("user", JSON.stringify(user));
            console.log(user)
            addLog({
                operator: "admin",
                action: "登录系统",
                target: "-",
                detail: "管理员登录后台"
            });
            console.log("准备跳转");
            navigate("/admin");

            console.log("跳转执行完成");
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

                    const users = await loadUsers();
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