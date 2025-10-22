import { create } from 'zustand';
import axios from 'axios';

const userStore = create((set) => ({
    user: null,
    isLoading: false,
    error: null,
    message: null,
    isAuthenticated: false,

    fetchUser : async () => {
        set({ isLoading: true, error: null, message: null });
        try {
            const response = await axios.get(`${import.meta.env.VITE_SERVER_PORT}/user/me`, 
                { 
                    withCredentials: true
                }
            );

            if(response.status === 200){
                set({
                    user: response.data.data,
                    isAuthenticated: true,
                });
                console.log("User fetched successfully", response.data.data);
            } else {
                set({
                    user: null,
                    isAuthenticated: false,
                });
            }
        } catch (error) {
            set({
                user: null,
                isAuthenticated: false,
                error: error.response ? error.response.data.message : error.message,
            });
            console.error("Error fetching user:", error);
            throw error;
        } finally {
            set({ isLoading: false });
        }
    },

    loginuser : async (credentials) => {
        set({ isLoading: true, error: null, message: null });
        try {
            const response = await axios.post(`${import.meta.env.VITE_SERVER_PORT}/user/login`, 
                credentials,
                { 
                    withCredentials: true
                }
            );
            if(response.status === 200){
                set({
                    user: response.data.data,
                    isAuthenticated: true,
                    message: response.data.message
                });
                console.log("User logged in successfully", response.data.data);
            } else {
                set({
                    user: null,
                    isAuthenticated: false,
                    message: response.data.message
                });
            }
        } catch (error) {
            set({
                user: null,
                isAuthenticated: false,
                error: error.response ? error.response.data.message : error.message
            });
            console.error("Error logging in:", error);
            throw error;
        } finally {
            set({ isLoading: false });
        }
    },

    logoutUser: async () => {
        set({ isLoading: true, error: null, message: null });
        try {
            const response = await axios.post(`${import.meta.env.VITE_SERVER_PORT}/user/logout`, {}, { withCredentials: true });
            if (response.status === 200) {
                set({
                    user: null,
                    isAuthenticated: false,
                    message: response.data.message
                });
                console.log("User logged out successfully");
            } else {
                set({
                    user: null,
                    isAuthenticated: false,
                    message: response.data.message
                });
            }
        } catch (error) {
            set({
                user: null,
                isAuthenticated: false,
                error: error.response ? error.response.data.message : error.message
            });
            console.error("Error logging out:", error);
            throw error;
        } finally {
            set({ isLoading: false });
        }
    }
}));


export default userStore;