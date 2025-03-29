import axios from "axios";

const API_BASE_URL = "https://reqres.in/api";

export const loginUser = async (email, password) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/login`, { email, password });
        return response.data.token;
    } catch (error) {
        throw new Error(error.response?.data?.error || "Login failed");
    }
};

export const getUsers = async (page) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/users?page=${page}`);
        return response.data;
    } catch (error) {
        throw new Error("Failed to fetch users. Please try again.");
    }
};

export const updateUser = async (id, userData) => {
    try {
        const response = await axios.put(`${API_BASE_URL}/users/${id}`, userData);
        return response.data;
    } catch (error) {
        throw new Error("Failed to update user. Please try again.");
    }
};

export const deleteUser = async (id) => {
    try {
        await axios.delete(`${API_BASE_URL}/users/${id}`);
        return { success: true, message: "User deleted successfully" };
    } catch (error) {
        throw new Error("Failed to delete user. Please try again.");
    }
};
