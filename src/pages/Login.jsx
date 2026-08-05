import { useState } from "react";
import './Login.css'
import { useNavigate } from "react-router-dom";
import { getList } from "../api/api";
import { addLog } from "../untils/log";


export function Login(){
    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");
    
    const navigate = useNavigate();
    
    async function loadUsers() {
        const response = await getList("/users");
        return response.data;   
    }
    
    function handleLogin(users){
        
        const user = users.find((user)=>{

            return (
                username === user.username &&
                password === user.password
            );

        });
        if(user){
            localStorage.setItem(
                "token",
                password
            );  
            addLog({
                operator: "admin",
                action: "登录系统",
                target: "-",
                detail: "管理员登录后台"
            });
            navigate("/admin");
        }else{
            alert("登录失败");
        }
    }
    
    return (
        <div className="login">
            <h1>Login</h1>
            <input placeholder="Username"  value={username} onChange={(username) => {
                setUsername(username.target.value);
            }}/>
            <input placeholder="Password" value={password} onChange={(password) => {
                setPassword(password.target.value);
            }} />
            <button onClick={async () => {
                const users = await loadUsers();
                handleLogin(users);
            }}>
            Login
            </button>
            
        </div>
    );
}