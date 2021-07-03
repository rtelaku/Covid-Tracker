import getOverlappingDaysInIntervals from 'date-fns/getOverlappingDaysInIntervals';
import { observer } from 'mobx-react-lite';
import React, { Fragment, useEffect } from 'react';
import { GridColumn, Header, Statistic} from 'semantic-ui-react';
import LoadingComponents from '../../../app/layout/LoadingComponents';
import NavBar from '../../../app/layout/NavBar';
import { useStore } from '../../../app/stores/store';
import { Card, CardContent, Typography, StylesProvider,Grid} from '@material-ui/core';
import styles from './Cards.module.css';
import cx from 'classnames';
import PatientListItem from '../../../features/patients/dashboard/PatientListItem';


export default observer (function DataCards(){

        const {patientStore} = useStore();
        const {loadPatients, patientRegistry, patientInfectedRegistry, patientRecoveredRegistry, patientDeadRegistry} = patientStore;
    
        useEffect(() => {
          //it's going to load patients from database only in the beginning, 
          //then it takes the patients from local memory
          if(patientRegistry.size <=1) patientStore.loadPatients();
        },[patientRegistry.size, patientStore]);
      
        if(patientStore.loadingInitial) return <LoadingComponents content='Loading patients...'/> 
      
        
return(
    <div className={styles.container}>
    <Grid container spacing={3} justify="center">
    <Grid item component={Card}  xs= {12} md={3} className={cx(styles.card, styles.infected)}>
        <CardContent>
            <Typography color="textSecondary" gutterBottom>Infected</Typography>
            <Typography variant="h5">{patientInfectedRegistry.size}</Typography>
            <Typography variant="body2">Number of active cases of COVID-19</Typography>
        </CardContent>
    </Grid>
    <Grid item component={Card}  xs= {12} md={3} className={cx(styles.card, styles.recovered)}>
        <CardContent>
            <Typography color="textSecondary" gutterBottom>Recovered</Typography>
            <Typography variant="h5">{patientRecoveredRegistry.size}</Typography>
            <Typography variant="body2">Number of recoveries from COVID-19</Typography>
        </CardContent>
    </Grid>
    <Grid item component={Card}  xs= {12} md={3} className={cx(styles.card, styles.deaths)}>
        <CardContent>
            <Typography color="textSecondary" gutterBottom>Deaths</Typography>
            <Typography variant="h5">{patientDeadRegistry.size}</Typography>
            <Typography variant="body2">Number of deaths caused by COVID-19</Typography>
        </CardContent>
    </Grid>
    </Grid>
</div>

);
})
