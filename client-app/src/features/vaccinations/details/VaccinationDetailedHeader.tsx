import { observer } from 'mobx-react-lite';
import React from 'react'
import { Link } from 'react-router-dom';
import {Button, Header, Item, Segment, Image, Grid, Modal, Icon, Tab} from 'semantic-ui-react'
import { Vaccination } from '../../../app/models/vaccination';
import { useStore } from '../../../app/stores/store';

const patientImageStyle = {
    filter: 'brightness(30%)'
};

const patientImageTextStyle = {
    position: 'absolute',
    bottom: '5%',
    left: '5%',
    width: '100%',
    height: 'auto',
    color: 'white'
};

interface Props {
    vaccination:Vaccination
}

export default observer (function VaccinationDetailedHeader({vaccination}: Props) {
    const [open, setOpen] = React.useState(false);
    const {vaccinationStore} = useStore();
    const {deleteVaccination} = vaccinationStore;
      
    
    return (
            <Segment clearing attached='bottom'>
            <Modal
            closeIcon
            open={open}
            trigger={<Button className="ui button" floated='right' color='red'>Remove vaccination center</Button>}
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            >
            <Header icon='archive' content='Confirm deletion' />
            <Modal.Content>
            <p>
            Are you sure you want to delete this vaccination center?
            </p>
            </Modal.Content>
            <Modal.Actions>
            <Button color='red' onClick={() => setOpen(false)}>
            <Icon name='remove' /> No
            </Button>
            <Button color='purple' as={Link} to='/vaccinations' onClick={() => 
            {
             deleteVaccination(vaccination.id)
             setOpen(false)
            }}>
            <Icon name='checkmark' /> Yes
            </Button>
            </Modal.Actions>
             </Modal>
            <Button as={Link} to={`/edit/${vaccination.id}`} color='purple'>
                    Modify vaccination center's data
                </Button>
            </Segment>
    )
})