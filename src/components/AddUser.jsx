import { useState } from "react";
import "./AddUser.css";
import { postObject } from "../api/api";
import { addLog } from "../untils/log";
import { minLength, required,isEmail,validate} from "../untils/validate";

export function AddUser({close,loadUsers,showToast}) {

    const [errors,setErrors] = useState({});
    const [formData,setFormData] = useState({
        newUserName:"",
        newUserPassword:"",
        newUserEmail:"",
        newUserRole: "普通用户",
    });

    const rules = {
        newUserName : [
            (value) => required(value,"用户名不能为空"),
            (value) => minLength(value,3,"用户名长度不能小于 3"),
        ],
        newUserPassword : [
            (value) => required(value,"密码不能为空"),
            (value) => minLength(value,6,"密码长度不能小于 6"),
        ],
        newUserEmail :[
            (value) => required(value,"邮箱不能为空"),
            (value) => isEmail(value,"请输入正确的邮箱格式"),
        ]

    };

    
    async function handleAddUser() {
        
        const newErrors = validate(formData, rules);
        setErrors(newErrors);
        if (Object.keys(newErrors).length > 0) {
        return;
        }

        const user = {
            id:Date.now().toString(),
            username : formData.newUserName,
            password : formData.newUserPassword,
            email : formData.newUserEmail,
            role : formData.newUserRole,
            status : "正常"
        };
        try {
            await postObject("/users",user);
            await addLog({
                action: "新增用户",
                target: formData.newUserName,
                detail: `角色：${formData.newUserRole}`
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
        setFormData({
            newUserName:"",
            newUserPassword:"",
            newUserEmail:"",
            newUserRole: "普通用户",
        });
        setErrors({});
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
                        <input type="text" value={formData.newUserName} placeholder="请输入账号" onChange={(e) => {
                            setFormData({
                                ...formData,
                                newUserName:e.target.value,
                            });
                        }}/>

                        {errors.newUserName && (
                            <span className="error">{errors.newUserName}</span>
                        )}
                    </div>
                    <div className="add-user-form-item">
                        <label>用户密码</label>
                        <input type="text" value={formData.newUserPassword} placeholder="请输入密码" onChange={(e) => {
                             setFormData({
                                ...formData,
                                newUserPassword:e.target.value,
                            });
                        }} />

                        {errors.newUserPassword && (
                            <span className="error">{errors.newUserPassword}</span>
                        )}
                    </div>
                    <div className="add-user-form-item">
                        <label>用户邮箱</label>
                        <input type="text" value={formData.newUserEmail} placeholder="请输入邮箱" onChange={(e) => {
                             setFormData({
                                ...formData,
                                newUserEmail:e.target.value,
                            });
                        }} />

                        {errors.newUserEmail && (
                            <span className="error">{errors.newUserEmail}</span>
                        )}
                    </div>
                    <div className="add-user-form-item">
                         <label>用户角色</label>
                        <select value={formData.newUserRole} onChange={(e) => {
                            setFormData({
                                ...formData,
                                newUserRole: e.target.value,
                            });
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