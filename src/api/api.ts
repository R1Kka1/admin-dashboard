import axios from "axios";
import type { AxiosError } from "axios";

function handleError(error:AxiosError) {
    if(error.response){
        switch(error.response.status){
            case 401 :
                console.error("登录已过期");
                localStorage.removeItem("user");
                localStorage.removeItem("token");
                break;

            case 403 :
                console.error("没有权限");
                break;
            case 404:
                console.error("资源不存在");
                break;

            case 500:
                console.error("服务器错误");
                break;

            default:
                console.error("请求失败");
        }
    }else if (error.request){
        console.error("网络连接失败");
    }else{
        console.error("请求发生错误");
    }
    
}

const request = axios.create({ 
    baseURL: import.meta.env.VITE_API_BASE_URL
})

//请求拦截器
request.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");

        if(token){
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);
//响应拦截器
request.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        handleError(error);
        return Promise.reject(error);
    }
);

export function getList<T>(url:string){
    return request.get<T>(url);
}

export function delObject<T>(url:string) {
    return request.delete<T>(url);
}

export function postObject<T>(url:string,object:T){
    return request.post<T>(url,object);
}

export function patchObject<T>(url:string,object:T){
    return request.patch<T>(url,object);
}

export function putObject<T>(url:string,object:T){
    return request.put<T>(url,object);
}