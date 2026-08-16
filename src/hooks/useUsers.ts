import { useEffect,useState } from "react";
import { getList } from "../api/api";
import type { User } from "../types/user";

export function useUsers() {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);

    const loadUsers = async () => {
        try {
            const response = await getList<User[]>("/users");
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