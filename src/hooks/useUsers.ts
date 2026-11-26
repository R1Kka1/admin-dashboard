import { useEffect,useState } from "react";
import { getList } from "../api/api";
import type { User } from "../types/user";

export function useUsers() {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);

    const loadUsers = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await getList<User[]>("http://localhost:3002/api/users",{
                headers: { Authorization: `Bearer ${token}` }
            });
            setUsers(response.data);
        } catch (error) {
            console.error("获取用户失败", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadUsers();
    }, []);

    return {
        users,
        loading,
        loadUsers
    };
}