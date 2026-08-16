import { postObject } from "../api/api"

interface AddLogParams {
    action: string;
    target: string;
    detail: string;
}

export async  function addLog({action,target,detail}:AddLogParams) {
    const userData = localStorage.getItem("user");

    const user = userData ? JSON.parse(userData) : null;

    await postObject("/logs", {
        operator: user?.username || "未知用户",
        action,
        target,
        detail,
        createdAt: new Date().toISOString()
    });
}