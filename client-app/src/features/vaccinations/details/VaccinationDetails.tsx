import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import { Grid } from 'semantic-ui-react';
import LoadingComponents from '../../../app/layout/LoadingComponents';
import NavBar from '../../../app/layout/NavBar';
import { useStore } from '../../../app/stores/store';
import VaccinationDetailedHeader from './VaccinationDetailedHeader';
import VaccinationDetailedInfo from './VaccinationDetailedInfo';


export default observer (function VaccinationDetails(){

  const {vaccinationStore} = useStore();
  const {selectedVaccination: vaccination, loadVaccination, loadingInitial} = vaccinationStore;
  const {id} = useParams<{id: string}>();

  useEffect(() => {
    if(id) loadVaccination(id);
  }, [id, loadVaccination])

  if(loadingInitial || !vaccination) return <LoadingComponents />;
  
    return(
      <>
      <NavBar />
       <Grid>
         <Grid.Row centered columns={1} >
         <Grid.Column width={10}>
           <VaccinationDetailedHeader vaccination={vaccination}/>
           <VaccinationDetailedInfo vaccination={vaccination}/>
         </Grid.Column>
         <Grid.Column>
         </Grid.Column>
         </Grid.Row>
       </Grid>
       </>
    )
})