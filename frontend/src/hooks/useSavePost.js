import { useContext, useState } from "react";
import { useAuthContext } from "./useAuthContext";
import UserPostStatusContext from "../context/UserPostStatusContext";
import AllUserPostStatusContext from "../context/AllUserPostStatusContext";

const useSavePost = () => {
	const [isUpdatingSave, setIsUpdatingSave] = useState(false);
    const {user} = useAuthContext()
    const {addStatus: addStatusToOwnUser} = useContext(UserPostStatusContext)
    const {addStatus: addStatusToAllUserStatus} = useContext(AllUserPostStatusContext)
	// const [isSaved, setIsSaved] = useState(user?.savedPosts?.includes(postId));

	const handleSavePost = async (postId, post) => {

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

            if (response.ok) {
                addStatusToOwnUser({...json, postId:post})

                addStatusToAllUserStatus({...json, postId:post, userId:{_id:user._id, email:user.email, username:user.username}})
            }

        } catch (error) {
            console.log(error)
        } finally {
            setIsUpdatingSave(false);
        }

	};

	return { handleSavePost, isUpdatingSave };
};

export default useSavePost;