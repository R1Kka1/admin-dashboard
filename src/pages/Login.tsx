import { useState } from "react";
import './Login.css'
import { useNavigate } from "react-router-dom";
import { addLog } from "../untils/log";
import { required,minLength,validate,type ValidationRule } from "../untils/validate";
import { useUsers } from "../hooks/useUsers";
interface LoginErrors{
    username?:string;
    password?:string;
}

export function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const { users} = useUsers();
    const [errors,setErrors] = useState<LoginErrors>({});

    const navigate = useNavigate();

    const rules:Record<string,ValidationRule[]> = {
        username : [
            (value) => required(value, "请输入用户名"),
        ],

        password: [
            (value) => required(value, "请输入密码"),
            (value) => minLength(value, 6, "密码至少6位"),
        ]
    };
    

    function handleLogin() {

        const formData = {
            username: username,
            password: password
        };

        const newErrors = validate(formData, rules);
        setErrors(newErrors);
        if (Object.keys(newErrors).length > 0) {
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
                onSubmit={(e) => {
                    e.preventDefault();
                    handleLogin();
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
                    <p className="error">{errors.username}</p>
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
                    <p className="error">{errors.password}</p>
                )}

                <button type="submit">
                    Login
                </button>
            </form>
        </div>
    );
}