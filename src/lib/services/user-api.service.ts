import { User } from "@/types/user";
import { axiosInstance } from "../config";
import { DEFAULT_TOKEN } from "../constant";



export const getUsers = async (): Promise<User[]> => {
    const response = await axiosInstance(DEFAULT_TOKEN).get(`/users`);
    return response.data.users;
}

export const getUserById = async (id: string): Promise<User> => {
    const response = await axiosInstance(DEFAULT_TOKEN).get(`/users/${id}`);
    return response.data.user;
}

export const createUser = async (user: User): Promise<User> => {
    const response = await axiosInstance(DEFAULT_TOKEN).post(`/users`, user);
    return response.data.user;
}

export const updateUser = async (id: string, user: User): Promise<User> => {
    const response = await axiosInstance(DEFAULT_TOKEN).put(`/users/${id}`, user);
    return response.data.user;
}

export const deleteUser = async (id: string): Promise<User> => {
    const response = await axiosInstance(DEFAULT_TOKEN).delete(`/users/${id}`);
    return response.data.user;
}


export const getUserByEmail = async (email: string): Promise<User> => {
    const response = await axiosInstance(DEFAULT_TOKEN).get(`/users/email/${email}`);
    return response.data.user;
}

// Authenticated variant that uses the current session token
export const getUserByIdWithToken = async (token: string, id: string): Promise<any> => {
    const response = await axiosInstance(token).get(`/users/${id}`);
    return response.data.user;
}
