import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { useStore } from "../../../app/stores/store";
import LoadingComponents from '../../../app/layout/LoadingComponents';
import DoctorList from "./DoctorList";
import { Grid } from "semantic-ui-react";
import DoctorNavBar from "../../../app/layout/DoctorNavBar";
import DoctorForm from "../form/DoctorForm";

export default observer(function DoctorDashboard() {
    const {doctorStore} = useStore();
    const {loadDoctors, doctorRegistry} = doctorStore;

    useEffect(() => {
      if (doctorRegistry.size <= 1) loadDoctors();
    }, [doctorRegistry.size, loadDoctors])
  
    if (doctorStore.loadingInitial) return <LoadingComponents content='Loading app' />

    return (
      
        <Grid> 
             <DoctorNavBar/>
            <Grid.Column width='9'>
                <DoctorList />
                
            </Grid.Column>
            <Grid.Column width='7' floated="right" margin-top>
                <DoctorForm />
                
            </Grid.Column>
        </Grid>
    )
})