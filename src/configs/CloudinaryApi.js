import axios from "axios";

const uploadImage = async(file) => {
    const cloudName = 'dwf1n70ew';
    const formData = new FormData();
    formData.append('file',file);
    formData.append('upload_preset','mocmo_preset');
    try{
        const res = await axios.post(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
            formData,
        )
        return res.data.secure_url;
    }catch(error){
        console.log(error);
    }
};

export default uploadImage;