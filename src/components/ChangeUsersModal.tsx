import "../styles/modal.css";
import { useState } from "react";
import { putObject } from "../api/api";
import { addLog } from "../untils/log";
import { isEmail, minLength, required,validate } from "../untils/validate";
import { User } from "../types/user";
interface ChangeUsersModalProps{
    close: () => void;
    user:User;
    loadUsers:() => Promise<void>;
    showToast:(message:string) => void;
}

export function ChangeUsersModal({
    close,
    user,
    loadUsers,
    showToast,
}:ChangeUsersModalProps) {

    const [errors,setErrors] = useState<Record<string,string>>({});
    const [formData,setFormData] = useState({
        changeUserName:user.username,
        changeUserPassword:user.password,
        changeUserEmail:user.email,
        changeUserRole:user.role,
        changeUserStatus:user.status
    });

    const rules = {
        changeUserName:[
            (value:string) => required(value,"用户名不能为空"),
            (value:string) => minLength(value,3,"用户名长度不能小于 3"),
        ],
        changeUserPassword:[
            (value:string) => required(value,"密码不能为空"),
            (value:string) => minLength(value,6,"密码长度不能小于 6"),
        ],
        changeUserEmail:[
            (value:string) => required(value,"邮箱不能为空"),
            (value:string) => isEmail(value,"请输入正确的邮箱格式"),
        ],
    };


    async function handleChangeUser() {

        const newErrors = validate(formData, rules);
        setErrors(newErrors);
        if (Object.keys(newErrors).length > 0) {
            return;
        }

        const updateUser = {
            ...user,
            username : formData.changeUserName,
            password : formData.changeUserPassword,
            email : formData.changeUserEmail,
            role : formData.changeUserRole,
            status : formData.changeUserStatus
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
       setFormData({
        changeUserName:user.username,
        changeUserPassword:user.password,
        changeUserEmail:user.email,
        changeUserRole:user.role,
        changeUserStatus:user.status
       });
       setErrors({});
    }



    return(
        <div className="modal">
            <div className="modal-pop">
                <div className="modal-header">
                    <h2>用户详情</h2>
                    <button className="modal-closeBtn" onClick={close}>X</button>
                </div>
                <div className="modal-content">
                    <div className="modal-form-item">
                        <label>账号:</label>
                        <input type="text" value={formData.changeUserName} onChange={(e) => {
                            setFormData({
                                ...formData,
                                changeUserName:e.target.value,
                            })
                        }}/>

                        {errors.changeUserName && (
                        <span className="error">{errors.changeUserName}</span>
                        )}
                    </div>
                    <div className="modal-form-item">
                        <label>密码:</label>
                         <input type="text" value={formData.changeUserPassword} onChange={(e) => {
                            setFormData({
                                ...formData,
                                changeUserPassword:e.target.value,
                            })
                        }}/>

                        {errors.changeUserPassword && (
                        <span className="error">{errors.changeUserPassword}</span>
                        )}
                    </div>
                    <div className="modal-form-item">
                        <label>邮箱:</label>
                         <input type="text" value={formData.changeUserEmail} onChange={(e) => {
                            setFormData({
                                ...formData,
                                changeUserEmail:e.target.value,
                            })
                        }}/>

                        {errors.changeUserEmail && (
                        <span className="error">{errors.changeUserEmail}</span>
                        )}
                    </div>
                    <div className="modal-form-item">
                        <label>权限:</label>
                        <select value={formData.changeUserRole} onChange={(e) => {
                            setFormData({
                                ...formData,
                                changeUserRole:e.target.value as User["role"],
                            })
                        }}>
                            <option value="普通用户">普通用户</option>
                            <option value="管理员">管理员</option>
                        </select>
                    </div>
                    <div className="modal-form-item">
                        <label>状态:</label>
                        <select value={formData.changeUserStatus} onChange={(e) => {
                            setFormData({
                                ...formData,
                                changeUserStatus:e.target.value,
                            })
                        }}>
                            <option value="正常">正常</option>
                            <option value="冻结">冻结</option>
                            <option value="禁用">禁用</option>
                        </select>
                    </div>
                </div>
                <div className="modal-footer">
                        <button className= "modal-saveBtn" onClick={handleChangeUser}>保存</button>
                        <button className= "modal-resetBtn" onClick={handleReset}>重置</button>
                        <button className= "modal-cancelBtn" onClick={close}>取消</button>
                </div>
            </div>
        </div>
    );
}