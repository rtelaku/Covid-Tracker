import { observer } from 'mobx-react-lite';
import { Fragment } from 'react';
import { Header } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import VaccinationListItem from './VaccinationListItem';

export default observer (function VaccinationList(){

    const {vaccinationStore} = useStore();
    const {groupedVaccinations} = vaccinationStore;
    
    return(
        <>
        {groupedVaccinations.map(([group, vaccinations]) => (
            <Fragment key={group} >
                <Header sub color='purple'>
                    {group}
                </Header> 

                {vaccinations.map(vaccination => (
                    <VaccinationListItem key={vaccination.id} vaccination={vaccination} />
                ))}

            </Fragment>

        ))}
        </> 
    )
})