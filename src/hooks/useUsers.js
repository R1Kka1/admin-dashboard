import { useEffect,useState } from "react";
import { getList } from "../api/api";

export function useUsers() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    const loadUsers = async () => {
        try {
            const response = await getList("/users");
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