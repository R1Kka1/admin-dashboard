import { useEffect,useState } from "react";
import { getList } from "../api/api";
import type { Log } from "../types/log";

export function useLogs() {
    const [logs,setLogs] = useState<Log[]>([]); 
    const [loading, setLoading] = useState(true);

    const loadLogs = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await getList<Log[]>("http://localhost:3002/api/orders",{
                headers: {Authorization: `Bearer ${token}` }
            });
            setLogs(response.data);
        } catch (error) {
            console.error("获取日志失败", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadLogs();
    }, []);

    return {
        logs,
        loading,
        loadLogs
    };
}