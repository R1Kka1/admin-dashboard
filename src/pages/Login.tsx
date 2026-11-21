import { useState } from "react";
import './Login.css'
import { useNavigate } from "react-router-dom";
import { addLog } from "../untils/log";
import { required,minLength,validate,type ValidationRule } from "../untils/validate";
import { useUsers } from "../hooks/useUsers";
import axios from "axios";
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
    

    async function handleLogin() {

        const formData = {
            username: username,
            password: password
        };

        const newErrors = validate(formData, rules);
        setErrors(newErrors);
        if (Object.keys(newErrors).length > 0) {
        return;
        }
        
        try{
            const res = await axios.post('http://localhost:3002/api/auth/login',formData);
            const {token,user} = res.data;

            localStorage.setItem("user", JSON.stringify(user));
            localStorage.setItem("token", token);
            addLog({
                action: "登录系统",
                target: "-",
                detail: "管理员登录后台"
            });
            navigate("/homepage");
        }catch(err){
            alert("登陆失败");
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
            <div className="tipsOnLogin">
                <div>测试账号(username): admin</div>
                <div>测试密码(password): 123456</div>
            </div>
        </div>
    );
}