import React, { useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import styles from './Chart.module.css';
import { useStore } from '../../../app/stores/store';
import LoadingComponents from '../../../app/layout/LoadingComponents';


const Chart: React.FunctionComponent = () => {
  const {patientStore} = useStore();
        const {loadPatients, patientRegistry, patientInfectedRegistry, patientRecoveredRegistry, patientDeadRegistry} = patientStore;
        
        useEffect(() => {
          //it's going to load patients from database only in the beginning, 
          //then it takes the patients from local memory
          if(patientRegistry.size <=1) patientStore.loadPatients();
        },[patientRegistry.size, patientStore]);
      
        if(patientStore.loadingInitial) return <LoadingComponents content='Loading patients...'/> 
    const data = {
  labels: ['Infected','Recovered','Deaths',],
  datasets: [
    {
      label: ['Cases'],
      data: [
        patientInfectedRegistry.size,
        patientRecoveredRegistry.size,
        patientDeadRegistry.size,
      ],
      backgroundColor: [
        'rgba(0, 0, 255, 0.5)',
        'rgba(0, 255, 0, 0.5)',
        'rgba(255, 0, 0, 0.5)',
      ],
      borderColor: [
        'rgba(0, 0, 255, 0.5)',
        'rgba(0, 255, 0, 0.5)',
        'rgba(255, 0, 0, 0.5)',
      ],
      borderWidth: 1,
      hoverBorderWidth:2,
      hoverBorderColor: '#696969',
    },
  ],
};

const options = {
  responsive:true,
  maintainAspectRatio: false,
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
        },
      },
    ],
    
  },
  
};


    return(
      <div className={styles.diagram}>
      <Bar type="bar" data={data} options={options} />
    </div>
    ) 
     
};


export default Chart;