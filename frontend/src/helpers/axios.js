import axios from "axios";

const baseURL = "http://127.0.0.1:8000/api/";

const api = axios.create({
    baseURL: baseURL,
    timeout: 5000,
    headers: {
        "Content-Type": "application/json",
    },
});

// GET request
export const getData = async (endpoint) => {
    try {
        const response = await api.get(endpoint);
        return response.data;
    } catch (error) {
        console.error("Error in GET request:", error);
        throw error;
    }
};

// POST request
export const postData = async (endpoint, data) => {
    try {
        const response = await api.post(endpoint, data);
        return response.data;
    } catch (error) {
        console.error("Error in POST request:", error);
        throw error;
    }
};

// DELETE request
export const deleteData = async (endpoint) => {
    try {
        await api.delete(endpoint);
    } catch (error) {
        console.error("Error in DELETE request:", error);
        throw error;
    }
};
