import { categoryOptions } from './../common/options/categoryOptions';
import { timingSafeEqual } from 'crypto';
import { makeAutoObservable, runInAction } from 'mobx';
import agent from '../api/agent';
import { Patient } from './../models/patient';
import { collapseTextChangeRangesAcrossMultipleVersions } from 'typescript';

export default class PatientStore{
patientRegistry = new Map<string, Patient>();
patientInfectedRegistry = new Map<string, Patient>();
patientRecoveredRegistry = new Map<string, Patient>();
patientDeadRegistry = new Map<string, Patient>();
selectedRegistry = this.patientRegistry;
selectedPatient: Patient | undefined = undefined;
editMode = false;
loading = false;
loadingInitial = false;

constructor() {
    makeAutoObservable(this)
}

get patientsByCity() {
    return Array.from(this.patientRegistry.values()).sort((a, b) => 
    ('' + a.city).localeCompare(b.city));
}

storePatietsByCategory = async () => {
    for(let [key, val] of this.patientRegistry.entries()){
        if(`${val.category}` === "Infected"){
            this.patientInfectedRegistry.set(`${val.id}`, val);
        } else if(`${val.category}` === "Recovered"){
            this.patientRecoveredRegistry.set(`${val.id}`, val);
        } else if(`${val.category}` === "Dead"){
            this.patientDeadRegistry.set(`${val.id}`, val);
        } 
    }
}  

get groupedPatients(){
    return Object.entries(
        this.patientsByCity.reduce((patients, patient) =>{
            const city = patient.city;
            patients[city] = patients[city] ? [...patients[city], patient] : [patient];
            return patients;
        }, {} as {[key: string]: Patient[]})
    )
}

loadPatients = async (category?: string) => {
    this.loadingInitial = true;
    try{
        const patients = await agent.Patients.list();
        if(category === "Infected"){
            patients.forEach(patient => {
                if(patient.category === "Infected"){
                 this.getPatientByCategory("Recovered");
                 this.getPatientByCategory("Dead");
                 this.setPatient(patient);
                }
            })
        }  else if(category === "Dead"){
            patients.forEach(patient => {
                if(patient.category === "Dead"){
                this.getPatientByCategory("Infected");
                this.getPatientByCategory("Recovered");
                this.setPatient(patient);
            }
            })
        } else if(category === "Recovered"){
            patients.forEach(patient => {
                if(patient.category === "Recovered"){
                this.getPatientByCategory("Infected");
                this.getPatientByCategory("Dead");
                this.setPatient(patient);
            }
            })
        } else {
            patients.forEach(patient => {
                this.setPatient(patient);
            })
        }
      
        this.storePatietsByCategory();
        this.setLoadingInitial(false);
    } catch(error) {
        console.log(error);
        this.setLoadingInitial(false);
    }
}

getPatientByCategory = (c: string) => {
     for(let [key, val] of this.patientRegistry.entries()){
        if(`${val.category}` === c){
            console.log(`${val.name}`)
            this.patientRegistry.delete(`${val.id}`);
        } 
}
}

loadPatient = async (id: string) => {
     let patient = this.getPatient(id);
     if(patient) {
         this.selectedPatient = patient;
         return patient;
     } else{
         this.loadingInitial = true;
         try{
            patient = await agent.Patients.details(id);
            this.setPatient(patient);
            runInAction(()=>{
              this.selectedPatient = patient;
            })
            this.setLoadingInitial(false);
            return patient;
         } catch(error){
             console.log(error);
             this.setLoadingInitial(false);
         }
     }
  }

private getPatient = (id: string) => {
    return this.patientRegistry.get(id);
}

private setPatient = (patient: Patient) => {
    patient.date = new Date(patient.date!);
    this.patientRegistry.set(patient.id, patient);
}

setLoadingInitial = (state: boolean) => {
    this.loadingInitial = state;
}

createPatient = async (patient: Patient) => {
    this.loading = true;
    try{
       await agent.Patients.create(patient);
       runInAction(()=>{
           this.patientRegistry.set(patient.id, patient);
           if(patient.category === "Infected"){
            this.patientInfectedRegistry.set(patient.id, patient);
        } else if(patient.category === "Recovered"){
            this.patientRecoveredRegistry.set(patient.id, patient);
        } else if(patient.category === "Dead"){
            this.patientDeadRegistry.set(patient.id, patient);
        }
           this.selectedPatient = patient;
           this.editMode = false;
           this.loading = false;
       })
    } catch(error){
        console.log(error);
        runInAction(()=>{
            this.loading = true;
        })
    }
}

updatePatient = async (patient: Patient) => {
    this.loading = true;
    try{
      await agent.Patients.update(patient);
      runInAction(()=>{ 
          if(patient.category === "Infected")  {
            this.patientInfectedRegistry.set(patient.id, patient); 
          } else if(patient.category === "Recovered")   {
            this.patientRecoveredRegistry.set(patient.id, patient);
          } else if(patient.category === "Dead"){
            this.patientDeadRegistry.set(patient.id, patient); 
          }
          this.patientRegistry.set(patient.id, patient);          
          this.selectedPatient = patient;
          this.editMode = false;
          this.loading = false;
      })
    } catch(error){
    console.log(error);
    runInAction(()=>{
        this.loading = false;
    })
    }
}

  deletePatient = async (id: string) => {
    this.loading = true;
    try{
      await agent.Patients.delete(id);
      runInAction(()=>{
          this.patientRegistry.delete(id);
          this.patientInfectedRegistry.delete(id);
          this.patientRecoveredRegistry.delete(id);
          this.patientDeadRegistry.delete(id);
          this.loading = false;
      })
    } catch(error){
    console.log(error);
    runInAction(()=>{
        this.loading = false;
    })
    }
}
}