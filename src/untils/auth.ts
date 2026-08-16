import type { User } from "../types/user";

export function getCurrentUser():User | null {
    const userData = localStorage.getItem("user");
    if(!userData){
        return null;
    }
    return JSON.parse(userData);
}