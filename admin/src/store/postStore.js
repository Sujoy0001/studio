import { create } from 'zustand';
import axios from 'axios';

const postStore = create((set) => ({
    posts: [],
    isLoading: false,
    error: null,
    message: null,
    createPost : async (postData) => {
        set({ isLoading: true, error: null, message: null });
        try {
            const response = await axios.post(`${import.meta.env.VITE_SERVER_PORT}/post/createPost`, postData, { withCredentials: true });
            if (response.status === 201) {
                set((state) => ({
                    posts: [...state.posts, response.data.data],
                    message: response.data.message
                }));
                console.log("Post created successfully", response.data.data);
            } else {
                set({ message: response.data.message });
            }
        } catch (error) {
            set({ error: error.response ? error.response.data.message : error.message });
            console.error("Error creating post:", error);
            throw error;
        } finally {
            set({ isLoading: false });
        }
    },
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
    },
    editPost: async (id, postData) => {
        set({ isLoading: true, error: null, message: null });
        try {
            const response = await axios.put(`${import.meta.env.VITE_SERVER_PORT}/post/editPost/${id}`, postData, { withCredentials: true });
            if (response.status === 200) {
                set((state) => ({
                    posts: state.posts.map((post) => (post.id === id ? response.data.data : post)),
                    message: response.data.message
                }));
                console.log("Post updated successfully", response.data.data);
            } else {
                set({ message: response.data.message });
            }
        } catch (error) {
            set({ error: error.response ? error.response.data.message : error.message });
            console.error("Error updating post:", error);
            throw error;
        } finally {
            set({ isLoading: false });
        }
    },
    deletePost: async (id) => {
        set({ isLoading: true, error: null, message: null });
        try {
            const response = await axios.delete(`${import.meta.env.VITE_SERVER_PORT}/post/deletePost/${id}`, { withCredentials: true });
            if (response.status === 200) {
                set((state) => ({
                    posts: state.posts.filter((post) => post.id !== id),
                    message: response.data.message
                }));
                console.log("Post deleted successfully", id);
            } else {
                set({ message: response.data.message });
            }
        } catch (error) {
            set({ error: error.response ? error.response.data.message : error.message });
            console.error("Error deleting post:", error);
            throw error;
        } finally {
            set({ isLoading: false });
        }
    },
    totalPosts : 0,
    fetchTotalPosts: async () => {
        set({ isLoading: true, error: null, message: null });
        try {
            const response = await axios.get(`${import.meta.env.VITE_SERVER_PORT}/post/totalPosts`, { withCredentials: true });
            if (response.status === 200) {
                set({ totalPosts: response.data.data.totalPosts });
                console.log("Total posts fetched successfully", response.data.data);
            } else {
                set({ message: response.data.message });
            }
        } catch (error) {
            set({ error: error.response ? error.response.data.message : error.message });
            console.error("Error fetching total posts:", error);
            throw error;
        } finally {
            set({ isLoading: false });
        }
    }
}));

export default postStore;