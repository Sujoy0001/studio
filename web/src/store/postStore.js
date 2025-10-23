import { create } from 'zustand';
import axios from 'axios';

const postStore = create((set) => ({
    posts: [],
    isLoading: false,
    error: null,
    message: null,
    getAllPosts: async () => {
        set({ isLoading: true, error: null, message: null });   
        try {
            const response = await axios.get(`${import.meta.env.VITE_SERVER_PORT}/post/getPosts`, { withCredentials: true });
            if (response.status === 200) {
                set({ posts: response.data.data });
                console.log("All posts fetched successfully", response.data.data);
            } else {
                set({ message: response.data.message });
            }
        } catch (error) {
            set({ error: error.response ? error.response.data.message : error.message });
            console.error("Error fetching posts:", error);
            throw error;
        } finally {
            set({ isLoading: false });
        }
    }
}));

export default postStore;