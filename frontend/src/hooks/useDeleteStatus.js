import { useContext, useState } from "react";
import { useAuthContext } from "./useAuthContext";
import UserPostStatusContext from "../context/UserPostStatusContext";
import AllUserPostStatusContext from "../context/AllUserPostStatusContext";
import { useLocation } from "react-router-dom";

const useDeleteStatus = (postId) => {
	const [isUpdatingDeleteStatus, setIsUpdatingDeleteStatus] = useState(false);
    const {user} = useAuthContext()
    const { deleteStatus: deleteStatusAsUser } = useContext(UserPostStatusContext);
    const { deleteStatus: deleteStatusAsAdmin } = useContext(AllUserPostStatusContext);
    const {pathname} = useLocation()


	const handleDeleteStatus = async (postId) => {
		if (isUpdatingDeleteStatus) return;
		// if (!user) return showToast("Error", "You must be logged in to save a post", "error");
		setIsUpdatingDeleteStatus(true);

        const data={
            postId: postId
        }

        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/status/deleteStatus`, {
                method: 'DELETE',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${user.token}`,
                },
                body: JSON.stringify(data)
            });

            const json = await response.json();

            if (response.ok) {
                if(user?.isAdmin || (pathname== "/profil" && user)){
                    deleteStatusAsAdmin(postId) //in the allUserPostStatusContext
                }

                if(user){
                    deleteStatusAsUser(postId) //in the userPostStatusContext
                }

            }

        } catch (error) {
            console.log(error)
        } finally {
            setIsUpdatingDeleteStatus(false);
        }
	};

	return {handleDeleteStatus, isUpdatingDeleteStatus };
};

export default useDeleteStatus;