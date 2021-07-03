import getOverlappingDaysInIntervals from 'date-fns/getOverlappingDaysInIntervals';
import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { Button, Container, Grid, GridColumn, Statistic} from 'semantic-ui-react';
import LoadingComponents from '../app/layout/LoadingComponents';
import { useStore } from '../app/stores/store';
import PatientList from '../features/patients/dashboard/PatientList';
import { Cards, Chart, CityPicker} from './components';
import styles from './App.module.css';
import { fetchData } from '../../src/userside/api';
import MySelectInput from '../app/common/form/MySelectInput';
import { cityOptions } from '../app/common/options/cityOptions';
import { Formik } from 'formik';
import UserNavBar from '../app/layout/UserNavBar';
import DataCards from './components/Cards/DataCards';
import { Link } from 'react-router-dom';



export default observer (function UserDashboard(){
        const {patientStore} = useStore();
        const {loadPatients, patientRegistry} = patientStore;
        
return(
  <>
  <UserNavBar />
    <div className={styles.container}>
    <DataCards />
    <Button as={Link} to='/' color='purple'>
                    Activate Chart
                </Button>
    <Chart />
    </div>
    </>
   );
})