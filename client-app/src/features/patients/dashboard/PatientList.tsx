import { observer } from 'mobx-react-lite';
import { Fragment } from 'react';
import { Header } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import PatientListItem from './PatientListItem';

export default observer (function PatientList(){

    const {patientStore} = useStore();
    const {groupedPatients} = patientStore;
    
    return(
        <>
        {groupedPatients.map(([group, patients]) => (
            <Fragment key={group} >
                <Header sub color='purple'>
                    {group}
                </Header>

                {patients.map(patient => (
                    <PatientListItem key={patient.id} patient={patient} />
                ))}

            </Fragment>

        ))}
        
        </>

        
    )
})