import axios from "axios";
import { useEffect, useState } from "react";

export const useUser = () => {
    const [loading, setLoading] = useState(true);
    const [userDetails, setUserDetails] = useState(null);


    const getDetails = async () => {
        try {
            const res = await axios.get("http://localhost:3000/api/v1.1/user/me", {
                headers: {"Authorization": "Bearer "+ localStorage.getItem("token")}
            });
            setUserDetails(res.data);
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
        
    }

    useEffect(() => {
        getDetails();
    }, [])

    return {loading, userDetails};
}