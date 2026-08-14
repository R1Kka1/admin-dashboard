import axios from "axios"

function handleError(error) {
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

export function getList(url){
    return request.get(url);
}

export function delObject(url) {
    return request.delete(url);
}

export function postObject(url,object){
    return request.post(url,object);
}

export function patchObject(url,object){
    return request.patch(url,object);
}

export function putObject(url,object){
    return request.put(url,object);
}