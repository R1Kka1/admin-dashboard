import { postObject } from "../api/api"

export async  function addLog({operator,action,target,detail}) {
    await postObject("/logs", {
        operator,
        action,
        target,
        detail,
        createdAt: new Date().toISOString()
    });
}