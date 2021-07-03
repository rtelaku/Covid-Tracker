import getOverlappingDaysInIntervals from 'date-fns/getOverlappingDaysInIntervals';
import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { Grid, GridColumn, Statistic} from 'semantic-ui-react';
import LoadingComponents from '../../../app/layout/LoadingComponents';
import NavBar from '../../../app/layout/NavBar';
import { useStore } from '../../../app/stores/store';
import PatientList from './PatientList';


export default observer (function PatientDashboard(){
  const {patientStore} = useStore();
  const {loadPatients, patientRegistry, patientInfectedRegistry, patientRecoveredRegistry, patientDeadRegistry} = patientStore;
  
  const [state, setState] = React.useState({
    value: {
      text: "All",
    },
  }
  );

    const handleChange = (event: { target: { value: any; }; }) => {
      setState({
        value: event.target.value,
      }
      );
      patientStore.loadPatients((String)(state.value));
    };

   
      useEffect(() => {
        //it's going to load patients from database only in the beginning, 
        //then it takes the patients from local memory
       
       if(patientRegistry.size <=1) patientStore.loadPatients((String)(state.value));
        
      },[patientRegistry.size, patientStore, state]
      );

      
        if(patientStore.loadingInitial) return <LoadingComponents content='Loading patients...'/> 
        
return(
  <>
   <NavBar/>
    <Grid>
       <Grid.Row centered>
     
       <div className="ui statistics">
  <div className="statistic">
    <div className="value">
      {patientInfectedRegistry.size}
    </div>
    <div className="label">
      Infected
    </div>
  </div>
  <div className="statistic">
    <div className="value">
    {patientRecoveredRegistry.size}
    </div>
    <div className="label">
      Recovered
    </div>
  </div>
  <div className="statistic">
    <div className="value">
    {patientDeadRegistry.size}
    </div>
    <div className="label">
      Dead
    </div>
  </div>
</div>
      </Grid.Row>
      <Grid.Row>
      </Grid.Row>
      <Grid.Row >
        <GridColumn width='6'>
        <select id="select-category"
              value={(String)(state.value)}
              onChange={handleChange}
            >
                <option value="All">All</option>
                <option value="Infected">Infected</option>
                <option value="Recovered">Recovered</option>
                <option value="Dead">Dead</option>
            </select>
        </GridColumn>
      <GridColumn width='10'>
       <PatientList  />
        </GridColumn>
        </Grid.Row>
    </Grid>
    </>
)
})
