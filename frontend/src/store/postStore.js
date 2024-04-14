import { create } from "zustand";

const usePostStore = create((set) => ({
	savedPosts: [],
	createPost: (savedPost) => set((state) => ({ savedPosts: [savedPost, ...state.savedPosts] })),
	setPosts: (posts) => set({ posts }),
}));

export default usePostStore;