import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import { Grid } from 'semantic-ui-react';
import LoadingComponents from '../../../app/layout/LoadingComponents';
import NavBar from '../../../app/layout/NavBar';
import UserNavBar from '../../../app/layout/UserNavBar';
import { useStore } from '../../../app/stores/store';
import PatientDetailedHeader from './PatientDetailedHeader';
import PatientDetailedInfo from './PatientDetailedInfo';

export default observer (function PatientDetails(){

  const {patientStore} = useStore();
  const {selectedPatient: patient, loadPatient, loadingInitial} = patientStore;
  const {id} = useParams<{id: string}>();

  useEffect(() => {
    if(id) loadPatient(id);
  }, [id, loadPatient])

  if(loadingInitial || !patient) return <LoadingComponents />;
  
    return(
      <>
      <NavBar />
       <Grid>
         <Grid.Row centered columns={1} >
         <Grid.Column width={10}>
           <PatientDetailedHeader patient={patient}/>
           <PatientDetailedInfo patient={patient}/>
         </Grid.Column>
         <Grid.Column>
         </Grid.Column>
         </Grid.Row>
       </Grid>
       </>
    )
})