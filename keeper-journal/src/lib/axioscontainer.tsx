import axios from "axios";

const instance = axios.create({
    baseURL: "http://localhost:8000",
    timeout: 0,
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
    },
});

export async function authenticateUser(username: string, password: string) {
    let callResponse = await instance({
        url: '/auth/',
        method: 'get',
        auth: {
            username: username,
            password: password
        },
        responseType: 'json'
    })
    return callResponse;
}

export async function createUser(data: any) {
    let callResponse = await instance({
        url: '/auth/',
        method: 'post',
        data: {
            first_name: data.firstName,
            last_name: data.lastName,
            email: data.email,
            username: data.username,
            password: data.password
        },
    })
    return callResponse;
}

export async function getEntries(username: string, password: string, page?: number) {
    if (page === undefined) {
        page = 1;
    }
    let callResponse = await instance({
        url: '/entry/?page=' + page,
        method: 'get',
        auth: {
            username: username,
            password: password
        },
        responseType: 'json'
    })
    return callResponse;
}

export async function getUser(username: string, password: string) {
    let callResponse = await instance({
        url: '/auth/',
        method: 'get',
        auth: {
            username: username,
            password: password
        },
        responseType: 'json'
    })
    return callResponse;
}

export async function createEntry(username:string, password:string, data:any) {
    let callResponse = await instance({
        url: '/entry/',
        method: 'post',
        auth: {
            username: username,
            password: password
        },
        data: {
            title: data.title,
            content: data.content,
        },
    })
    console.log(callResponse);
    return callResponse;
}

export async function getSingleEntry(username: string, password: string, id: number) {
    let callResponse = await instance({
        url: '/entry/' + id + '/',
        method: 'get',
        auth: {
            username: username,
            password: password
        },
        responseType: 'json'
    })
    return callResponse;
}

export async function updateEntry(username: string, password: string, id: number, data: any) {
    let callResponse = await instance({
        url: '/entry/' + id + '/',
        method: 'put',
        auth: {
            username: username,
            password: password
        },
        data: {
            title: data.title,
            content: data.content,
        },
    })
    return callResponse;
}

export async function deleteEntry(username: string, password: string, id: number) {
    let callResponse = await instance({
        url: '/entry/' + id + '/',
        method: 'delete',
        auth: {
            username: username,
            password: password
        },
    })
    return callResponse;
}

export async function updateUser(username: string, password: string, data: any) {
    let callResponse = await instance({
        url: '/auth/',
        method: 'put',
        auth: {
            username: username,
            password: password
        },
        data: {
            first_name: data.firstName,
            last_name: data.lastName,
            email: data.email,
            username: data.username,
            password: data.password
        },
    })
    return callResponse;
}