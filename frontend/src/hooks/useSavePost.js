import { useContext, useState } from "react";
import { useAuthContext } from "./useAuthContext";
import PostsContext from "../context/PostsContext";

const useSavePost = (postId) => {
	const [isUpdatingSave, setIsUpdatingSave] = useState(false);
    const {user} = useAuthContext()
    const {editPost } = useContext(PostsContext);
	const [isSaved, setIsSaved] = useState(user?.savedPosts?.includes(postId));

	const handleSavePost = async (postId) => {
		if (isUpdatingSave) return;
		// if (!user) return showToast("Error", "You must be logged in to save a post", "error");
		setIsUpdatingSave(true);

        const data={
            postId: postId
        }

        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/status/savePost`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${user.token}`,
                },
                body: JSON.stringify(data)
            });

            const json = await response.json();
            console.log(json)
            if (response.ok) {
                // editPost(postId, json)
            }

        } catch (error) {
            console.log(error)
        } finally {
            setIsUpdatingSave(false);
        }
	};

	return { isSaved, handleSavePost, isUpdatingSave };
};

export default useSavePost;