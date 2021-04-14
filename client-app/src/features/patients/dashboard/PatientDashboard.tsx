import React from 'react';
import { Grid, GridColumn, List } from 'semantic-ui-react';
import { Patient } from '../../../app/models/patient';
import PatientsDetails from '../details/PatientDetails';
import PatientForm from '../form/PatientForm';
import PatientList from './PatientList';

interface Props{
    patients: Patient[];
    selectedPatient: Patient | undefined;
    selectPatient:(id: string)=>void;
    cancelSelectPatient: ()=> void;
    editMode: boolean;
    openForm:(id: string) => void;
    closeForm:()=>void;
    createOrEdit:(patient: Patient)=>void;
    deletePatient:(id: string) => void;
    submitting:boolean;
}

export default function PatientDashboard({patients, selectedPatient,
     selectPatient, cancelSelectPatient, editMode, openForm , closeForm, 
     createOrEdit, deletePatient,submitting}: Props){
return(
    <Grid>
        <GridColumn width='10'>
       <PatientList patients={patients}
        selectPatient={selectPatient}
        deletePatient={deletePatient}
        submitting={submitting}
        />
        </GridColumn>
        <GridColumn width='6'>
            {selectedPatient && !editMode &&
            <PatientsDetails 
            patient={selectedPatient} 
            cancelSelectPatient={cancelSelectPatient} 
            openForm={openForm}
            submitting={submitting}
            />}
            {editMode &&
            <PatientForm closeForm={closeForm} 
            patient={selectedPatient} createOrEdit={createOrEdit} 
            submitting={submitting}/>}
        </GridColumn>
    </Grid>
)


}