import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import { Grid } from 'semantic-ui-react';
import LoadingComponents from '../../../app/layout/LoadingComponents';
import NavBar from '../../../app/layout/NavBar';
import { useStore } from '../../../app/stores/store';
import DoctorDetailedHeader from './DoctorDetailedHeader';
import DoctorDetailedInfo from './DoctorDetailedInfo';


export default observer (function DoctorDetails(){

  const {doctorStore} = useStore();
  const {selectedDoctor: doctor, loadDoctor, loadingInitial} = doctorStore;
  const {id} = useParams<{id: string}>();

  useEffect(() => {
    if(id) loadDoctor(id);
  }, [id, loadDoctor])

  if(loadingInitial || !doctor) return <LoadingComponents />;
  
    return(
      <>
      <NavBar />
       <Grid>
         <Grid.Row centered columns={1} >
         <Grid.Column width={10}>
           <DoctorDetailedHeader doctor={doctor}/>
           <DoctorDetailedInfo doctor={doctor}/>
         </Grid.Column>
         <Grid.Column>
         </Grid.Column>
         </Grid.Row>
       </Grid>
       </>
    )
})