import { postObject } from "../api/api"

export async  function addLog({action,target,detail}) {
    const user = JSON.parse(localStorage.getItem("user"));

    await postObject("/logs", {
        operator: user?.username || "未知用户",
        action,
        target,
        detail,
        createdAt: new Date().toISOString()
    });
}