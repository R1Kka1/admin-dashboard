import { useState } from "react";
import './Login.css'
import { useNavigate } from "react-router-dom";
import { addLog } from "../untils/log";
import { useUsers } from "../hooks/useUsers";

export function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const { users} = useUsers();
    const [errors,setErrors] = useState({});

    const navigate = useNavigate();

    const validateLogin = () => {
        const newErrors = {};
        if(!username.trim()){
            newErrors.username = "❗请输入用户名";
        }
        if(!password.trim()){
            newErrors.password = "❗请输入密码";
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    }


    function handleLogin(users) {
        if (!validateLogin()) {
            return;
        }
        const user = users.find((user) => {

            return (
                username.trim() === user.username &&
                password === user.password
            );

        });
        if (user) {
            const { password: _ , ...safeUser} = user;
            localStorage.setItem("user", JSON.stringify(safeUser));
            localStorage.setItem(
                "token",
                Math.random().toString(36).substring(2)
            );
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
                {errors.username && (
                    <p>{errors.username}</p>
                )}

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => {
                        setPassword(e.target.value);
                    }}
                />
                {errors.password && (
                    <p>{errors.password}</p>
                )}

                <button type="submit">
                    Login
                </button>
            </form>
        </div>
    );
}