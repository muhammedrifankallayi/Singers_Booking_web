import axios from "axios";
const client = axios.create({ baseURL: "https://spot-light.website/" })
export const request = ({ ...options }) => {
    client.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem('artistKey')}`
    const onSuccess = (response) => response
    const onError = (error) => {
        return error
    }

    return client(options).then(onSuccess).catch(onError)
}


const user = axios.create({ baseURL: "https://spot-light.website/" })
export const userRequest = ({ ...options }) => {
    user.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem('token')}`
    const onSuccess = (response) => response
    const onError = (error) => {
        return error
    }

    return user(options).then(onSuccess).catch(onError)
}

const admin = axios.create({ baseURL: "https://spot-light.website/" })
export const adminRequest = ({ ...options }) => {
    admin.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem('adminKey')}`
    const onSuccess = (response) => response
    const onError = (error) => {
        return error
    }

    return admin(options).then(onSuccess).catch(onError)
}   