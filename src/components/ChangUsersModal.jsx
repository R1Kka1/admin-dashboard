import "./ChangeUsersModal.css";
import { useState } from "react";
import { putObject } from "../api/api";
import { addLog } from "../untils/log";

export function ChangeUsersModal({close,user,loadUsers,showToast}) {
    const [changeUserName,setChangeUserName] = useState(user.username);
    const [changeUserPassword,setChangeUserPassword] = useState(user.password);
    const [changeUserEmail,setChangeUserEmail] = useState(user.email);
    const [changeUserRole,setChangeUserRole] = useState(user.role);
    const [changeUserStatus,setChangeUserStatus] = useState(user.status);
    const [errors,setErrors] = useState({});

    const validate = () => {
        const newErrors = {};

        if(!changeUserName.trim()){
            newErrors.username = "用户名不能为空";
        }else if (changeUserName.trim().length < 3){
            newErrors.username = "用户名长度不能小于 3";
        }

        if(changeUserPassword === ""){
            newErrors.password = "密码不能为空";
        }else if (changeUserPassword.trim().length < 6){
            newErrors.password = "密码长度不能小于 6";
        }

        if(changeUserEmail === ""){
            newErrors.email = "邮箱不能为空";
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };
    async function handleChangeUser() {
        if(!validate()){
            return;
        }
        const updateUser = {
            ...user,
            username : changeUserName,
            password : changeUserPassword,
            email : changeUserEmail,
            role : changeUserRole,
            status : changeUserStatus
        };
        try{
            await putObject(
                `/users/${user.id}`,
                updateUser
            );
            await addLog({
                action: "修改用户",
                target: user.username,
                detail: "修改了用户信息"
            });
            showToast("✅️修改成功");
            await loadUsers();
            close();
        }catch(error){
            console.log(error);
            showToast("❌修改失败");
        }
    }


    function handleReset() {
        setChangeUserName(user.username);
        setChangeUserPassword(user.password);
        setChangeUserRole(user.role);
        setChangeUserEmail(user.email);
        setChangeUserStatus(user.status);
    }



    return(
        <div className="change-users-modal">
            <div className="change-users-pop">
                <div className="change-users-header">
                    <h2>用户详情</h2>
                    <button onClick={close}>X</button>
                </div>
                <div className="change-users-main">
                    <div className="change-users-details">
                        <label>账号:</label>
                        <input type="text" value={changeUserName} onChange={(e) => {
                            setChangeUserName(e.target.value);
                        }}/>

                        {errors.username && (
                        <span className="error">{errors.username}</span>
                        )}
                    </div>
                    <div className="change-users-details">
                        <label>密码:</label>
                         <input type="text" value={changeUserPassword} onChange={(e) => {
                            setChangeUserPassword(e.target.value);
                        }}/>

                        {errors.password && (
                        <span className="error">{errors.password}</span>
                        )}
                    </div>
                    <div className="change-users-details">
                        <label>邮箱:</label>
                         <input type="text" value={changeUserEmail} onChange={(e) => {
                            setChangeUserEmail(e.target.value);
                        }}/>

                        {errors.email && (
                        <span className="error">{errors.email}</span>
                        )}
                    </div>
                    <div className="change-users-details">
                        <label>权限:</label>
                        <select value={changeUserRole} onChange={(e) => {
                            setChangeUserRole(e.target.value)
                        }}>
                            <option value="普通用户">普通用户</option>
                            <option value="管理员">管理员</option>
                        </select>
                    </div>
                    <div className="change-users-details">
                        <label>状态:</label>
                        <select value={changeUserStatus} onChange={(e) => {
                            setChangeUserStatus(e.target.value)
                        }}>
                            <option value="正常">正常</option>
                            <option value="冻结">冻结</option>
                            <option value="禁用">禁用</option>
                        </select>
                    </div>
                </div>
                <div className="change-users-bottom">
                        <button onClick={handleChangeUser}>保存</button>
                        <button onClick={handleReset}>重置</button>
                        <button onClick={close}>取消</button>
                </div>
            </div>
        </div>
    );
}