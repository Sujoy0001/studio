import { create } from 'zustand';
import axios from 'axios';

const teamStore = create((set) => ({
    members: [],
    isLoading: false,
    error: null,
    message: null,
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
}));

export default teamStore;