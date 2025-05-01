import axios from "axios"
const apiUrl = import.meta.env.VITE_API_URL;

export const loginUserAuth = async(fields)=>{
    try {
        
        const response = await axios.post(`${apiUrl}/api/auth/login`, {
            ...fields
        },{withCredentials: true});

        return response.data;
        
    } catch (error) {
        if(axios.isAxiosError(error)) return { success: false, message: error.response?.data?.message || "Login failed" };
        else return { success: false, message: "An unexpected error occurred" };
    }
}


export const signupUserAuth = async(fields)=>{
    try {
        
        const response = await axios.post(`${apiUrl}/api/auth/signup`, {
            ...fields
        },{withCredentials: true});

        return response.data;
        
    } catch (error) {
        if(axios.isAxiosError(error)) return { success: false, message: error.response?.data?.message || "Signup failed" };
        else return { success: false, message: "An unexpected error occurred" };
    }
}

export const getUserDetails = async()=>{

    try {
        const response = await axios.get(`${apiUrl}/api/auth/getUser`,{withCredentials:true});
        return response.data;
        
    } catch (error) {
        if(axios.isAxiosError(error)) return { success: false, message: error.response?.data?.message || "Couldn't find user details." };
        else return { success: false, message: "An unexpected error occurred" };
    }
}

export const logoutUser = async()=>{
    try {
        const response = await axios.post(`${apiUrl}/api/auth/logout`, {}, {withCredentials:true});
        return response.data;
        
    } catch (error) {
        if(axios.isAxiosError(error)) return { success: false, message: error.response?.data?.message || "Error in logout." };
        else return { success: false, message: "An unexpected error occurred" };
    }
}