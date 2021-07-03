import axios from 'axios';

const url = "http://localhost:5000/api/patients/";

export const fetchData = async () => {
    try {
        const response = await axios.get(url);
        //vazhdon kodi
        return response;
    }catch (error){

    }
}

export const fetchDailyDate = async () => {
    try {
        const response = await axios.get(`${url}`);
    }catch (error){

    }
}


