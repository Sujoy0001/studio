import { create } from 'zustand';
import axios from 'axios';

const teamStore = create((set) => ({
    members: [],
    isLoading: false,
    error: null,
    message: null,
    createTeamMember: async (memberData) => {
        set({ isLoading: true, error: null, message: null });
        try {
            const response = await axios.post(`${import.meta.env.VITE_SERVER_PORT}/team/createMember`, memberData, { withCredentials: true });
            if (response.status === 201) {
                set((state) => ({
                    members: [...state.members, response.data.data],
                    message: response.data.message
                }));
                console.log("Team member created successfully", response.data.data);
            } else {
                set({ message: response.data.message });
            }
        } catch (error) {
            set({ error: error.response ? error.response.data.message : error.message });
            console.error("Error creating team member:", error);
            throw error;
        } finally {
            set({ isLoading: false });
        }
    },
    getAllTeamMembers: async () => {
        set({ isLoading: true, error: null, message: null });
        try {
            const response = await axios.get(`${import.meta.env.VITE_SERVER_PORT}/team/getMembers`, { withCredentials: true });
            if (response.status === 200) {
                set({ members: response.data.data });
                console.log("All team members fetched successfully", response.data.data);
            } else {
                set({ message: response.data.message });
            }
        } catch (error) {
            set({ error: error.response ? error.response.data.message : error.message });
            console.error("Error fetching team members:", error);
            throw error;
        } finally {
            set({ isLoading: false });
        }
    },
    singleTeamMember: null,
    getTeamMemberById: async (id) => {
        set({ isLoading: true, error: null, message: null });
        try {
            const response = await axios.get(`${import.meta.env.VITE_SERVER_PORT}/team/getMember/${id}`, { withCredentials: true });
            if (response.status === 200) {
                set({ singleTeamMember: response.data.data });
                console.log("Team member fetched successfully", response.data.data);
            } else {
                set({ message: response.data.message });
            }
        } catch (error) {
            set({ error: error.response ? error.response.data.message : error.message });
            console.error("Error fetching team member:", error);
            throw error;
        } finally {
            set({ isLoading: false });
        }
    },
    editTeamMember: async (id, memberData) => {
        set({ isLoading: true, error: null, message: null });
        try {
            const response = await axios.put(`${import.meta.env.VITE_SERVER_PORT}/team/editMember/${id}`, memberData, { withCredentials: true });
            if (response.status === 200) {
                set((state) => ({
                    members: state.members.map((member) => (member.id === id ? response.data.data : member)),
                    message: response.data.message
                }));
                console.log("Team member updated successfully", response.data.data);
            } else {
                set({ message: response.data.message });
            }
        } catch (error) {
            set({ error: error.response ? error.response.data.message : error.message });
            console.error("Error updating team member:", error);
            throw error;
        } finally {
            set({ isLoading: false });
        }
    },
    deleteTeamMember: async (id) => {
        set({ isLoading: true, error: null, message: null });
        try {
            const response = await axios.delete(`${import.meta.env.VITE_SERVER_PORT}/team/deleteMember/${id}`, { withCredentials: true });
            if (response.status === 200) {
                set((state) => ({
                    members: state.members.filter((member) => member.id !== id),
                    message: response.data.message
                }));
                console.log("Team member deleted successfully", id);
            } else {
                set({ message: response.data.message });
            }
        } catch (error) {
            set({ error: error.response ? error.response.data.message : error.message });
            console.error("Error deleting team member:", error);
            throw error;
        } finally {
            set({ isLoading: false });
        }
    },
    totalMember : 0,
    getTotalTeamMembers: async () => {
        set({ isLoading: true, error: null, message: null });
        try {
            const response = await axios.get(`${import.meta.env.VITE_SERVER_PORT}/team/totalTeamMembers`, { withCredentials: true });
            if (response.status === 200) {
                set({ totalMember: response.data.data });
                console.log("Total team members fetched successfully", response.data.data);
            } else {
                set({ message: response.data.message });
            }
        } catch (error) {
            set({ error: error.response ? error.response.data.message : error.message });
            console.error("Error fetching total team members:", error);
            throw error;
        } finally {
            set({ isLoading: false });
        }
    }
}));

export default teamStore;