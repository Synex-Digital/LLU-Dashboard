import { create } from "zustand";

// Boolean store example
const navBarStore = create((set) => ({
    bears: false, // Initial boolean value
    toggleBears: () => set((state) => ({ bears: !state.bears })), // Toggle true/false
    setBearsTrue: () => set({ bears: true }), // Set bears to true
    setBearsFalse: () => set({ bears: false }) // Set bears to false
}));

export default navBarStore;