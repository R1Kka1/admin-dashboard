
import { delObject } from "../api/api";
import { addLog } from "../untils/log";
import type { User } from "../types/user";
import "../styles/modal.css";

interface DelUsersModalProps{
    close: () => void;
    user:User;
    loadUsers:() => Promise<void>;
    showToast:(message:string) => void;
    setSelectUser:(user: User | null) => void;
}

export function DelUserPop ({
    user,
    close,
    loadUsers,
    setSelectUser,
    showToast}:DelUsersModalProps) {
    async function handleDelete(){
        try{
            await delObject(`/users/${user.id}`);
            await addLog({
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
        <div className="modal">
            <div className="modal-pop">
                <div className="modal-header">
                        <h2>删除用户</h2>
                        <button className="modal-closeBtn" onClick={close}>
                            X
                        </button>
                </div>
                <div className="modal-content">
                    <div>用户ID:{user.username}</div>
                    <div>用户密码:{user.password}</div>
                    <div>用户权限:{user.role}</div>
                </div>
                <div className="modal-footer">
                    <button className="modal-deleteBtn" onClick={handleDelete}>确定</button>
                    <button className="modal-cancelBtn" onClick={close}>取消</button>
                </div>
            </div>
        </div>
    );
}