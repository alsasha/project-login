import axios from '../plugins/axios';

export async function registration(
    email, 
    password,
    nickname,
    first_name,
    last_name,
    phone,
    gender_orientation, // or "female"
    country,
    city,
    date_of_birth_day,
    date_of_birth_month,
    date_of_birth_year
) {
    try {
        const responce = await axios.post(
            `/auth/signup`, 
            JSON.stringify({
                email, 
                password,
                nickname,
                first_name,
                last_name,
                phone,
                gender_orientation, // or "female"
                country,
                city,
                date_of_birth_day,
                date_of_birth_month,
                date_of_birth_year
                })
            );
        return responce;
    } catch (err) {
        console.log(err);
        return Promise.reject(err);
    }  
}

