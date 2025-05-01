import axios from "axios"
const apiUrl = import.meta.env.VITE_API_URL;

export const createProject = async(fields)=>{
    try {   
        const response = await axios.post(`${apiUrl}/api/project/createProject`, {
            ...fields
        },{withCredentials: true});


        return response.data;
        
    } catch (error) {
        if(axios.isAxiosError(error)) return { success: false, message: error.response?.data?.message || "Project creation failed!" };
        else return { success: false, message: "An unexpected error occurred" };
    }
}


export const fetchAllProjects = async()=>{
    try {
        const response = await axios.get(`${apiUrl}/api/project/getAllProjects`, {withCredentials: true});
        return response.data;
        
    } catch (error) {
        if(axios.isAxiosError(error)) return { success: false, message: error.response?.data?.message || "Project fetching failed!" };
        else return { success: false, message: "An unexpected error occurred" };
    }
}

export const fetchProjectDetails = async (title)=>{

    try {
        const response = await axios.get(`${apiUrl}/api/project/${title}`, {withCredentials: true});
        return response.data;
    } catch (error) {
        if(axios.isAxiosError(error)) return { success: false, message: error.response?.data?.message || "Project data fetching failed!" };
        else return { success: false, message: "An unexpected error occurred" };
    }
}

export const addFiles = async (fields)=>{

    try {
        const response = await axios.post(`${apiUrl}/api/project/createFile`,{...fields},{withCredentials: true});
        return response.data;
    } catch (error) {
        if(axios.isAxiosError(error)) return { success: false, message: error.response?.data?.message || "File creation failed!" };
        else return { success: false, message: "An unexpected error occurred" };
    }
}
export const deleteFile = async ( projectId ,fileId)=>{

    try {
        const response = await axios.delete(`${apiUrl}/api/project/${projectId}/files/${fileId}`,{withCredentials: true});
        return response.data;
    } catch (error) {
        if(axios.isAxiosError(error)) return { success: false, message: error.response?.data?.message || "File deletion failed!" };
        else return { success: false, message: "An unexpected error occurred" };
    }
}

export const updateFile = async ( fields)=>{

    try {
        const response = await axios.patch(`${apiUrl}/api/project/updateFile`,{...fields},{withCredentials: true});
        return response.data;
    } catch (error) {
        if(axios.isAxiosError(error)) return { success: false, message: error.response?.data?.message || "File updation failed!" };
        else return { success: false, message: "An unexpected error occurred" };
    }
}


