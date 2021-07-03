import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { useStore } from "../../../app/stores/store";
import LoadingComponents from '../../../app/layout/LoadingComponents';
import { Grid } from "semantic-ui-react";
import NavBar from "../../../app/layout/NavBar";
import VaccinationList from "./VaccinationList";
import VaccinationForm from "../form/VaccinationForm";

export default observer(function VaccinationDashboard() {
    const {vaccinationStore} = useStore();
    const {loadVaccinations, vaccinationRegistry} = vaccinationStore;

    useEffect(() => {
      if (vaccinationRegistry.size <= 1) loadVaccinations();
    }, [vaccinationRegistry.size, loadVaccinations])
  
    if (vaccinationStore.loadingInitial) return <LoadingComponents content='Loading app' />

    return (
      
        <Grid> 
             <NavBar/>
            <Grid.Column width='9'>
                <VaccinationList />
                
            </Grid.Column>
            <Grid.Column width='7' floated="right" margin-top>
                <VaccinationForm />
                
            </Grid.Column>
        </Grid>
    )
})