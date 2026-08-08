import { useEffect,useState } from "react";
import { getList } from "../api/api";

export function useLogs() {
    const [logs,setLogs] = useState([]); 
    const [loading, setLoading] = useState(true);

    const loadLogs = async () => {
        try {
            const response = await getList("/logs");
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