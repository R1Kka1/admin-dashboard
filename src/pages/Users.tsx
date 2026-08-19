import { useEffect,useState } from "react";
import "./Users.css";
import {AddUser} from "../components/AddUser.jsx";
import { getList } from "../api/api.js";
import { ChangeUsersModal } from "../components/ChangeUsersModal.jsx";
import { DelUserPop } from "../components/DelUserPop.jsx";
import { Loading } from "../components/Loading.jsx";
import { Toast } from "../components/Toast.jsx";
import type { User } from "../types/user";

export function Users() {
    const [users,setUsers] = useState<User[]>([]);
    const [showAddUserModal,setShowAddUserModal] = useState(false);
    const [showChangeUserModal,setShowChangeUserModal] = useState(false);
    const [showDelUserModal,setShowDelUserModal] = useState(false);
    const [selectUser,setSelectUser] = useState<User | null>(null);
    const [keyword, setKeyword] = useState("");
    const [loading,setLoading] = useState(true);
    const [toast,setToast] = useState("");

    async function loadUsers() {
        setLoading(true);
        try{
            const response = await getList<User[]>("/users");
            setUsers(response.data);
        }
        catch(error){
            console.log(error);
        }
        finally{
            setLoading(false);
        }
    }

    useEffect(() => {

        loadUsers();
    },[]);

    function showToast(message: string){

        setToast(message);

        setTimeout(()=>{
            setToast("");
        },2000);

    }


    const filteredUsers = users.filter((user) => {
        return user.username.toLowerCase().includes(keyword.toLowerCase());
    });

    if(loading){
        return <Loading />;
    }

    return (
        <div className="usersPage">
            <div className="pageTitle">
                <div className='searchUser'>
                    <input className="searchInput" placeholder="搜索用户" value={keyword} onChange={(e) => {
                        setKeyword(e.target.value);
                    }}/>
                </div>
                <div><button className="addUserBtn" onClick={() => {
                    setShowAddUserModal(true)
                }}>添加用户</button></div>
            </div>
            <div className="usersTitles">
                <div>账号</div>
                <div>密码</div>
                <div>邮箱</div>
                <div>权限</div>
                <div>状态</div>
                <div>操作</div>
            </div>
            <div className="usersDetails">
            {filteredUsers.map((user) => {
                return (
                    <div key={user.id} className="userRow">
                        <div>{user.username}</div>
                        <div>{user.password}</div>
                        <div>{user.email}</div>
                        <div>{user.role}</div>
                        <div>{user.status}</div>
                        <div className="userActions">
                            <button 
                                className="changeUserBtn"
                                onClick={() => {
                                setSelectUser(user)
                                setShowChangeUserModal(true)
                            }}>修改</button>
                            <button 
                                className="delUserBtn"
                                onClick={() => {
                                setSelectUser(user)
                                setShowDelUserModal(true)
                            }}>删除</button>
                        </div>
                        
                    </div>
                );
            })}
            </div>
            {
                showAddUserModal&& selectUser&&<AddUser 
                close={() => {setShowAddUserModal(false)}}
                users={users}
                loadUsers={loadUsers}
                showToast={showToast}
                />
            }
            {
                showChangeUserModal&& selectUser&&<ChangeUsersModal 
                close={() => {setShowChangeUserModal(false)}}
                user={selectUser}
                loadUsers={loadUsers}
                showToast={showToast}
                />
            }
            {
                showDelUserModal&& selectUser&&<DelUserPop 
                close={() => {setShowDelUserModal(false)}}
                user={selectUser}
                loadUsers={loadUsers}
                setSelectUser={setSelectUser}
                showToast={showToast}
                />
            }
            {
                toast &&
                <Toast message={toast}/>
            }
        </div>
    );
}