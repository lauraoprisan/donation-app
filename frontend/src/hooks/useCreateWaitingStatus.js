import { useContext, useState } from "react";
import { useAuthContext } from "./useAuthContext";
import UserPostStatusContext from "../context/UserPostStatusContext";
import AllUserPostStatusContext from "../context/AllUserPostStatusContext";

const useCreateWaitingStatus = () => {
	const [isUpdatingWaitingStatus, setIsUpdatingWaitingStatus] = useState(false);
    const {user} = useAuthContext()
    const {addStatus: addStatusToOwnUser} = useContext(UserPostStatusContext)
    const {addStatus: addStatusToAllUserStatus} = useContext(AllUserPostStatusContext)

	const handleCreateWaitingStatus = async (postId, post) => {
		if (isUpdatingWaitingStatus) return;
		// if (!user) return showToast("Error", "You must be logged in to save a post", "error");
		setIsUpdatingWaitingStatus(true);

        const data={
            postId: postId
        }

        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/status/setUpWaitingStatus`, {
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
            setIsUpdatingWaitingStatus(false);
        }
	};

	return { handleCreateWaitingStatus, isUpdatingWaitingStatus };
};

export default useCreateWaitingStatus;