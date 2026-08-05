import "./DelUserPop.css";
import { delObject } from "../api/api";
import { addLog } from "../untils/log";

export function DelUserPop ({user,close,loadUsers,setSelectUser,showToast}) {
    async function handleDelete(){
        try{
            await delObject(`/users/${user.id}`);
            await addLog({
                operator: "admin",
                action: "删除用户",
                target: user.username,
                detail: `删除${user.role}账号`
            });
            showToast("✅️删除用户成功");
            await loadUsers();
            setSelectUser(null);
            close(); 
        }catch{
             showToast("❌删除用户失败");
        }
    }    
    return (
        <div className="product-del-modal">
            <div className="delProduct">
                <h2>确定要删除用户吗?</h2>
                <div className="product-del-detail">
                    <div>用户ID:{user.username}</div>
                    <div>用户密码:{user.password}</div>
                    <div>用户权限:{user.role}</div>
                </div>
                <div className="product-del-Btns">
                    <button onClick={handleDelete} className="del-product-btn">确定</button>
                    <button onClick={close}>取消</button>
                </div>
            </div>
            <div>

            </div>
        </div>
    );
}