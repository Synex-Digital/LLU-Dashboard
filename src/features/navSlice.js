import { create } from "zustand";


const navBarStore = create((set) => ({
    bears: false, 
    toggleBears: () => set((state) => ({ bears: !state.bears })), 
    setBearsTrue: () => set({ bears: true }), 
    setBearsFalse: () => set({ bears: false }) 
}));

export default navBarStore;