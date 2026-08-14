import { useState } from "react";
import "./AddUser.css";
import { postObject } from "../api/api";
import { addLog } from "../untils/log";

export function AddUser({close,loadUsers,users,showToast}) {
    const [newUserName,setNewUserName] = useState("");
    const [newUserPassword,setNewUserPassword] = useState("");
    const [newUserRole,setNewUserRole] = useState("普通用户");
    const [newUserEmail,setNewUserEmail] = useState("");
    const [errors,setErrors] = useState({});

    const validate = () => {
        const newErrors = {};

        if(!newUserName.trim()){
            newErrors.username = "用户名不能为空";
        }else if (newUserName.trim().length < 3){
            newErrors.username = "用户名长度不能小于 3";
        }

        if(newUserPassword === ""){
            newErrors.password = "密码不能为空";
        }else if (newUserPassword.trim().length < 6){
            newErrors.password = "密码长度不能小于 6";
        }

        if(newUserEmail === ""){
            newErrors.email = "邮箱不能为空";
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };
    async function handleAddUser() {
        
        if(!validate()){
            return ;
        }

        const user = {
            id:String(users.length + 1),
            username : newUserName,
            password : newUserPassword,
            email : newUserEmail,
            role : newUserRole,
            status : "正常"
        };
        try {
            await postObject("/users",user);
            await addLog({
                action: "新增用户",
                target: newUserName,
                detail: `角色：${newUserRole}`
            });
            showToast("✅️新建用户成功");
            await loadUsers();
            close();
        }
        catch(error){
            console.log(error);
            showToast("❌新建用户失败");
        }
    }
    function handleReset() {
        setNewUserName("");
        setNewUserPassword("");
        setNewUserRole("普通用户");
        setNewUserEmail("");
    }

    return (
        <div className="add-user-modal">
            <div className="add-user-pop">
                <div className="add-user-header">
                    <h2>新增用户</h2>
                    <button onClick={close}>X</button>
                </div>
                <div className="add-user-main">
                    <div className="add-user-form-item">
                        <label>用户名</label>
                        <input type="text" value={newUserName} placeholder="请输入账号" onChange={(e) => {
                            setNewUserName(e.target.value);
                        }}/>

                        {errors.username && (
                            <span className="error">{errors.username}</span>
                        )}
                    </div>
                    <div className="add-user-form-item">
                        <label>用户密码</label>
                        <input type="text" value={newUserPassword} placeholder="请输入密码" onChange={(e) => {
                            setNewUserPassword(e.target.value);
                        }} />

                        {errors.password && (
                            <span className="error">{errors.password}</span>
                        )}
                    </div>
                    <div className="add-user-form-item">
                        <label>用户邮箱</label>
                        <input type="text" value={newUserEmail} placeholder="请输入邮箱" onChange={(e) => {
                            setNewUserEmail(e.target.value);
                        }} />

                        {errors.email && (
                            <span className="error">{errors.email}</span>
                        )}
                    </div>
                    <div className="add-user-form-item">
                         <label>用户角色</label>
                        <select value={newUserRole} onChange={(e) => {
                            setNewUserRole(e.target.value)
                        }}>
                            <option value="普通用户">普通用户</option>
                            <option value="管理员">管理员</option>
                        </select>
                    </div>
                    
                   
                </div>
                <div className="add-user-bottom">
                        <button onClick={handleAddUser}>添加</button>
                        <button onClick={handleReset}>重置</button>
                        <button onClick={close}>取消</button>
                </div>
            </div>
        </div>
    );
}