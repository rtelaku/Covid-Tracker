import { Photo, Profile } from './../models/profile';
import { store } from './../stores/store';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { toast } from 'react-toastify';
import { history } from '../..';
import { Patient } from '../models/patient';
import { Doctor } from '../models/doctor';
import { User, UserFormValues } from '../models/user';
import { Vaccination } from '../models/vaccination';


const sleep = (delay: number) =>{
    return new Promise((resolve) =>
    {
        setTimeout(resolve, delay)
    })
}

axios.defaults.baseURL ='http://localhost:5000/api';

axios.interceptors.request.use(config => {
    const token = store.commonStore.token;
    if (token) config.headers.Authorization = `Bearer ${token}`
    return config;
})

axios.interceptors.response.use(async response =>
    {
            await sleep(1000);
            return response;
    }, (error: AxiosError) => {
        const {data, status, config} = error.response!;
        switch(status){
            case 400: 
            if(typeof data === 'string'){
                    toast.error(data);
            } 
            if(config.method === 'get' && data.errors.hasOwnProperty('id')){
                history.push('/not-found');
            }
            if(data.errors){
                const modalStateErrors = [];
                for(const key in data.errors){
                    if(data.errors[key]){
                        modalStateErrors.push(data.errors[key])
                    }
                }
                throw modalStateErrors.flat();
            } 
            break;
            case 401:
            toast.error('Unauthorized');
            break;
            case 404:
            history.push('/not-found');
            break;
            case 500:
            store.commonStore.setServerError(data);
            history.push('/server-error');
            break;            
        }
        return Promise.reject(error);
    } )
const responseBody =<T>(response: AxiosResponse<T>) => response.data;

const requests={
get:<T>(url: string) => axios.get<T>(url).then(responseBody),
post:<T>(url: string, body: {}) => axios.post<T>(url,body).then(responseBody),
put:<T>(url: string, body: {}) => axios.put<T>(url,body).then(responseBody),
del:<T>(url: string) => axios.delete<T>(url).then(responseBody)
}

const Patients ={
    list:() =>requests.get<Patient[]>('/patients'),
    details: (id: string)=> requests.get<Patient> (`/patients/${id}`),
    create: (patient: Patient) =>axios.post<void>('/patients', patient),
    update: (patient:Patient) =>axios.put<void>(`/patients/${patient.id}`, patient),
    delete: (id: string) => axios.delete<void>(`/patients/${id}`)
}

const Doctors ={
    list:() =>requests.get<Doctor[]>('/doctors'),
    details: (id: string)=> requests.get<Doctor> (`/doctors/${id}`),
    create: (doctor: Doctor) =>axios.post<void>('/doctors', doctor),
    update: (doctor:Doctor) =>axios.put<void>(`/doctors/${doctor.id}`, doctor),
    delete: (id: string) => axios.delete<void>(`/doctors/${id}`)
}
const Vaccinations ={
    list:() =>requests.get<Vaccination[]>('/vaccinations'),
    details: (id: string)=> requests.get<Vaccination> (`/vaccinations/${id}`),
    create: (vaccination: Vaccination) =>axios.post<void>('/vaccinations', vaccination),
    update: (vaccination:Vaccination) =>axios.put<void>(`/vaccinations/${vaccination.id}`, vaccination),
    delete: (id: string) => axios.delete<void>(`/vaccinations/${id}`)
}

const Account = {
    current: () => requests.get<User>('/account'),
    login: (user: UserFormValues) => requests.post<User>('/account/login', user),
    register: (user: UserFormValues) => requests.post<User>('/account/register', user),
}

const Profiles = {
    get: (username: string) => requests.get<Profile>(`/profiles/${username}`),
    uploadPhoto: (file: Blob) => {
        let formData = new FormData();
        formData.append('File', file);
        return axios.post<Photo>('photos', formData, {
            headers: { 'Content-type': 'multipart/form-data' }
        })
    },
    setMainPhoto: (id: string) => requests.post(`/photos/${id}/setMain`, {}),
    deletePhoto: (id: string) => requests.del(`/photos/${id}`),
    updateProfile: (profile: Partial<Profile>) => requests.put(`/profiles`, profile),
}

const agent={
    Patients,
    Account,
    Profiles,
    Doctors,
    Vaccinations
}


export default agent;