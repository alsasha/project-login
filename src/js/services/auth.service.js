import axios from '../plugins/axios';

export async function login(email, password) {
    try {
        const responce = await axios.post(
            `/auth/login`, 
            JSON.stringify({ email, password})
            );
        return responce.data;
    } catch (err) {
        console.log(err);
        return Promise.reject(err);
    }  
}


