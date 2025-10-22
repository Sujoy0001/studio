import { create } from 'zustand';
import axios from 'axios';

const projectStore = create((set) => ({
    projects: [],
    isLoading: false,
    error: null,
    message: null,
    getAllProjects: async () => {
        set({ isLoading: true, error: null, message: null });
        try {
            const response = await axios.get(`${import.meta.env.VITE_SERVER_PORT}/project/getProjects`, { withCredentials: true });
            if (response.status === 200) {
                set({ projects: response.data.data });
                console.log("All projects fetched successfully", response.data.data);
            } else {
                set({ message: response.data.message });
            }
        } catch (error) {
            set({ error: error.response ? error.response.data.message : error.message });
            console.error("Error fetching projects:", error);
            throw error;
        } finally {
            set({ isLoading: false });
        }
    },
    singleProject: null,
    getProjectById: async (projectId) => {
        set({ isLoading: true, error: null, message: null });
        try {
            const response = await axios.get(`${import.meta.env.VITE_SERVER_PORT}/project/getProject/${projectId}`, { withCredentials: true });
            if (response.status === 200) {
                set({ singleProject: response.data.data });
                console.log("Project fetched successfully", response.data.data);
            } else {
                set({ message: response.data.message });
            }
        } catch (error) {
            set({ error: error.response ? error.response.data.message : error.message });
            console.error("Error fetching project:", error);
            throw error;
        } finally {
            set({ isLoading: false });
        }
    },
}));

export default projectStore;