import { observer } from 'mobx-react-lite';
import React from 'react'
import { Link } from 'react-router-dom';
import {Button, Header, Item, Segment, Image, Grid, Modal, Icon, Tab} from 'semantic-ui-react'
import { Doctor } from '../../../app/models/doctor';
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
    doctor:Doctor
}

export default observer (function DoctorDetailedHeader({doctor}: Props) {
    const [open, setOpen] = React.useState(false);
    const {doctorStore} = useStore();
    const {deleteDoctor} = doctorStore;
      
    
    return (
            <Segment clearing attached='bottom'>
            <Modal
            closeIcon
            open={open}
            trigger={<Button className="ui button" floated='right' color='red'>Remove doctor</Button>}
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            >
            <Header icon='archive' content='Confirm doctor deletion' />
            <Modal.Content>
            <p>
            Are you sure you want to delete this doctor?
            </p>
            </Modal.Content>
            <Modal.Actions>
            <Button color='red' onClick={() => setOpen(false)}>
            <Icon name='remove' /> No
            </Button>
            <Button color='purple' as={Link} to='/doctors' onClick={() => 
            {
             deleteDoctor(doctor.id)
             setOpen(false)
            }}>
            <Icon name='checkmark' /> Yes
            </Button>
            </Modal.Actions>
             </Modal>
            <Button as={Link} to={`/update/${doctor.id}`} color='purple'>
                    Modify doctor's data
                </Button>
            </Segment>
    )
})