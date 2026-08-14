import { useEffect,useState } from "react";
import "./Users.css";
import {AddUser} from "../components/AddUser.jsx";
import { getList } from "../api/api.js";
import { ChangeUsersModal } from "../components/ChangeUsersModal.jsx";
import { DelUserPop } from "../components/DelUserPop.jsx";
import { Loading } from "../components/Loading.jsx";
import { Toast } from "../components/Toast.jsx";

export function Users() {
    const [users,setUsers] = useState([]);
    const [showAddUserModal,setShowAddUserModal] = useState(false);
    const [showChangeUserModal,setShowChangeUserModal] = useState(false);
    const [showDelUserModal,setShowDelUserModal] = useState(false);
    const [selectUser,setSelectUser] = useState(null);
    const [keyword, setKeyword] = useState("");
    const [loading,setLoading] = useState(true);
    const [toast,setToast] = useState("");

    async function loadUsers() {
        setLoading(true);
        try{
            const response = await getList("/users");
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

    function showToast(message){

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
        <div>
            <div className="userControl">
                <div className='searchProduct'>
                    <input className="searchInput" placeholder="搜索商品" value={keyword} onChange={(e) => {
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
                        <div><button onClick={() => {
                            setSelectUser(user)
                            setShowChangeUserModal(true)
                        }}>修改</button></div>
                        <div><button onClick={() => {
                            setSelectUser(user)
                            setShowDelUserModal(true)
                           
                        }}>删除</button></div>
                    </div>
                );
            })}
            </div>
            {
                showAddUserModal&&<AddUser 
                close={() => {setShowAddUserModal(false)}}
                users={users}
                loadUsers={loadUsers}
                showToast={showToast}
                />
            }
            {
                showChangeUserModal&&<ChangeUsersModal 
                close={() => {setShowChangeUserModal(false)}}
                user={selectUser}
                loadUsers={loadUsers}
                showToast={showToast}
                />
            }
            {
                showDelUserModal&&<DelUserPop 
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