import getOverlappingDaysInIntervals from 'date-fns/getOverlappingDaysInIntervals';
import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { Grid, GridColumn, Statistic} from 'semantic-ui-react';
import LoadingComponents from '../../../app/layout/LoadingComponents';
import { useStore } from '../../../app/stores/store';
import PatientList from './PatientList';


export default observer (function PatientDashboard(){

        const {patientStore} = useStore();
        const {loadPatients, patientRegistry} = patientStore;
        
        useEffect(() => {
          //it's going to load patients from database only in the beginning, 
          //then it takes the patients from local memory
          if(patientRegistry.size <=1) patientStore.loadPatients();
        },[patientRegistry.size, patientStore]);
      
        if(patientStore.loadingInitial) return <LoadingComponents content='Loading patients...'/> 
        
return(
    <Grid>
       <Grid.Row centered>
        <Statistic >
        <Statistic.Value>{patientRegistry.size}</Statistic.Value>
        <Statistic.Label>Infected</Statistic.Label>
       </Statistic>
      </Grid.Row>
      <Grid.Row centered>
      <GridColumn width='12'>
       <PatientList />
        </GridColumn>
        </Grid.Row>
    </Grid>
)
})