import { observer } from 'mobx-react-lite';
import { Fragment } from 'react';
import { Header } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import PatientListItem from '../../patients/dashboard/PatientListItem';
import DoctorListItem from './DoctorListItem';

export default observer (function DoctorList(){

    const {doctorStore} = useStore();
    const {groupedDoctors} = doctorStore;
    
    return(
        <>
        {groupedDoctors.map(([group, doctors]) => (
            <Fragment key={group} >
                <Header sub color='purple'>
                    {group}
                </Header> 

                {doctors.map(doctor => (
                    <DoctorListItem key={doctor.id} doctor={doctor} />
                ))}

            </Fragment>

        ))}
        </> 
    )
})