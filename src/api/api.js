import axios from "axios"

const request = axios.create({ baseURL:"http://localhost:3001"})

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