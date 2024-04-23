import { useContext, useState } from "react";
import { useAuthContext } from "./useAuthContext";
import UserPostStatusContext from "../context/UserPostStatusContext";

const useUnsavePost = (postId) => {
	const [isUpdatingUnsave, setIsUpdatingUnsave] = useState(false);
    const {user} = useAuthContext()
    const {deleteStatus} = useContext(UserPostStatusContext)

	const handleUnsavePost = async (postId) => {
		if (isUpdatingUnsave) return;
		// if (!user) return showToast("Error", "You must be logged in to save a post", "error");
		setIsUpdatingUnsave(true);

        const data={
            postId: postId
        }

        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/status/unsavePost`, {
                method: 'DELETE',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${user.token}`,
                },
                body: JSON.stringify(data)
            });

            const json = await response.json();
            // console.log(json)
            if (response.ok) {
                deleteStatus(postId)
            }

        } catch (error) {
            console.log(error)
        } finally {
            setIsUpdatingUnsave(false);
        }
	};

	return {handleUnsavePost, isUpdatingUnsave };
};

export default useUnsavePost;