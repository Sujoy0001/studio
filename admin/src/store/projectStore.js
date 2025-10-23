import { create } from 'zustand';
import axios from 'axios';

const projectStore = create((set) => ({
    projects: [],
    isLoading: false,
    error: null,
    message: null,
    createProject: async (projectData) => {
        set({ isLoading: true, error: null, message: null });
        try {
            const response = await axios.post(`${import.meta.env.VITE_SERVER_PORT}/project/createProject`, projectData, { withCredentials: true });
            if (response.status === 201) {
                set((state) => ({
                    projects: [...state.projects, response.data.data],
                    message: response.data.message
                }));
                console.log("Project created successfully", response.data.data);
            } else {
                set({ message: response.data.message });
            }
        } catch (error) {
            set({ error: error.response ? error.response.data.message : error.message });
            console.error("Error creating project:", error);
            throw error;
        } finally {
            set({ isLoading: false });
        }
    },
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
    editProject: async (id, projectData) => {
        set({ isLoading: true, error: null, message: null });
        try {
            const response = await axios.put(`${import.meta.env.VITE_SERVER_PORT}/project/updateProject/${id}`, projectData, { withCredentials: true });
            if (response.status === 200) {
                set((state) => ({
                    projects: state.projects.map((project) => (project.id === id ? response.data.data : project)),
                    message: response.data.message
                }));
                console.log("Project updated successfully", response.data.data);
            } else {
                set({ message: response.data.message });
            }
        } catch (error) {
            set({ error: error.response ? error.response.data.message : error.message });
            console.error("Error updating project:", error);
            throw error;
        } finally {
            set({ isLoading: false });
        }
    },
    deleteProject: async (id) => {
        set({ isLoading: true, error: null, message: null });
        try {
            const response = await axios.delete(`${import.meta.env.VITE_SERVER_PORT}/project/deleteProject/${id}`, { withCredentials: true });
            if (response.status === 200) {
                set((state) => ({
                    projects: state.projects.filter((project) => project.id !== id),
                    message: response.data.message
                }));
                console.log("Project deleted successfully", id);
            } else {
                set({ message: response.data.message });
            }
        } catch (error) {
            set({ error: error.response ? error.response.data.message : error.message });
            console.error("Error deleting project:", error);
            throw error;
        } finally {
            set({ isLoading: false });
        }
    },
    getTotalProjects: async () => {
        set({ isLoading: true, error: null, message: null });
        try {
            const response = await axios.get(`${import.meta.env.VITE_SERVER_PORT}/project/totalProjects`, { withCredentials: true });
            if (response.status === 200) {
                // Extract the number from the response data
                set({ totalProject: response.data.data.totalProjects });
                console.log("Total projects fetched successfully", response.data.data.totalProjects);
            } else {
                set({ message: response.data.message });
            }
        } catch (error) {
            set({ error: error.response ? error.response.data.message : error.message });
            console.error("Error fetching total projects:", error);
            throw error;
        } finally {
            set({ isLoading: false });
        }
    },
    getLastProject: async () => {
        set({ isLoading: true, error: null, message: null });
        try {
            const response = await axios.get(`${import.meta.env.VITE_SERVER_PORT}/project/lastProject`, { withCredentials: true });
            if (response.status === 200) {
                // Extract the date from the response data
                set({ lastProjectDate: response.data.data.lastData });
                console.log("Last project fetched successfully", response.data.data.lastData);
            } else {
                set({ message: response.data.message });
            }
        } catch (error) {
            set({ error: error.response ? error.response.data.message : error.message });
            console.error("Error fetching last project:", error);
            throw error;
        } finally {
            set({ isLoading: false });
        }
    }
}));

export default projectStore;