import { makeAutoObservable, runInAction } from 'mobx';
import agent from '../api/agent';
import { collapseTextChangeRangesAcrossMultipleVersions } from 'typescript';
import { Vaccination } from '../models/vaccination';

export default class VaccinationStore{
vaccinationRegistry = new Map<string, Vaccination>();
selectedRegistry = this.vaccinationRegistry;
selectedVaccination: Vaccination | undefined = undefined;
editMode = false;
loading = false;
loadingInitial = false;

constructor() {
    makeAutoObservable(this)
}

get vaccinationsByCity() {
    return Array.from(this.vaccinationRegistry.values()).sort((a, b) => 
    ('' + a.city).localeCompare(b.city));
}


get groupedVaccinations(){
    return Object.entries(
        this.vaccinationsByCity.reduce((vaccinations, vaccination) =>{
            const city = vaccination.city;
            vaccinations[city] = vaccinations[city] ? [...vaccinations[city], vaccination] : [vaccination];
            return vaccinations;
        }, {} as {[key: string]:Vaccination[]})
    )
}

loadVaccinations = async () => {
    this.loadingInitial = true;
    try {
        const vaccinations = await agent.Vaccinations.list();
        vaccinations.forEach(vaccination => {
            this.setVaccination(vaccination);
        })
        this.setLoadingInitial(false);
    } catch (error) {
        console.log(error);
        this.setLoadingInitial(false);
    }
}

loadVaccination = async (id: string) => {
     let vaccination = this.getVaccination(id);
     if(vaccination) {
         this.selectedVaccination = vaccination;
         return vaccination;
     } else{
         this.loadingInitial = true;
         try{
            vaccination = await agent.Vaccinations.details(id);
            this.setVaccination(vaccination);
            runInAction(()=>{
              this.selectedVaccination = vaccination;
            })
            this.setLoadingInitial(false);
            return vaccination;
         } catch(error){
             console.log(error);
             this.setLoadingInitial(false);
         }
     }
  }

private getVaccination = (id: string) => {
    return this.vaccinationRegistry.get(id);
}

private setVaccination = (vaccination: Vaccination) => {
    this.vaccinationRegistry.set(vaccination.id, vaccination);
}

setLoadingInitial = (state: boolean) => {
    this.loadingInitial = state;
}

createVaccination = async (vaccination: Vaccination) => {
    this.loading = true;
    try {
        await agent.Vaccinations.create(vaccination);
        runInAction(() => {
            this.vaccinationRegistry.set(vaccination.id, vaccination);
            this.selectedVaccination = vaccination;
            this.editMode = false;
            this.loading = false;
        })
    } catch (error) {
        console.log(error);
        runInAction(() => {
            this.loading = false;
        })
    }
}

updateVaccination = async (vaccination: Vaccination) => {
    this.loading = true;
    try {
        await agent.Vaccinations.update(vaccination);
        runInAction(() => {
            this.vaccinationRegistry.set(vaccination.id, vaccination);
            this.selectedVaccination = vaccination;
            this.editMode = false;
            this.loading = false;
        })
    } catch (error) {
        console.log(error);
        runInAction(() => {
            this.loading = false;
        })
    }
}

deleteVaccination = async (id: string) => {
    this.loading = true;
    try {
        await agent.Vaccinations.delete(id);
        runInAction(() => {
            this.vaccinationRegistry.delete(id);
            this.loading = false;
        })
    } catch (error) {
        console.log(error);
        runInAction(() => {
            this.loading = false;
        })
    }
}
}
