import { createContext, useContext } from "react";
import CommonStore from "./commonStore";
import DoctorStore from "./doctorStore";
import ModalStore from "./modalStore";
import PatientStore from "./patientStore";
import ProfileStore from "./profileStore";
import UserStore from "./userStore";
import VaccinationStore from "./vaccinationStore";

interface Store {
    patientStore: PatientStore;
    vaccinationStore: VaccinationStore;
    doctorStore: DoctorStore;
    commonStore: CommonStore;
    userStore: UserStore;
    modalStore: ModalStore;
    profileStore: ProfileStore;
}

export const store: Store = {
    patientStore: new PatientStore(),
    doctorStore: new DoctorStore(),
    vaccinationStore: new VaccinationStore(),
    commonStore: new CommonStore(),
    userStore: new UserStore(),
    modalStore: new ModalStore(),
    profileStore: new ProfileStore()
}

export const StoreContext = createContext(store);

export function useStore(){
    return useContext(StoreContext);
}