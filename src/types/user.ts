export interface User {
    id: number;
    username: string;
    password: string;
    email: string;
    role: "普通用户" | "管理员" | "超级管理员";
    status: string;
}