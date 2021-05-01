import { observer } from 'mobx-react-lite';
import React from 'react'
import { Link } from 'react-router-dom';
import {Button, Header, Item, Segment, Image, Grid, Modal, Icon, Tab} from 'semantic-ui-react'
import {Patient} from "../../../app/models/patient";
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
    patient: Patient
}

export default observer (function PatientDetailedHeader({patient}: Props) {
    const [open, setOpen] = React.useState(false);
    const {patientStore} = useStore();
    const {deletePatient} = patientStore;
      
    
    return (
            <Segment clearing attached='bottom'>
            <Modal
            closeIcon
            open={open}
            trigger={<Button className="ui button" floated='right' color='red'>Remove patient</Button>}
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            >
            <Header icon='archive' content='Confirm patient deletion' />
            <Modal.Content>
            <p>
            Are you sure you want to delete this patient?
            </p>
            </Modal.Content>
            <Modal.Actions>
            <Button color='red' onClick={() => setOpen(false)}>
            <Icon name='remove' /> No
            </Button>
            <Button color='purple' as={Link} to='/patients' onClick={() => 
            {
             deletePatient(patient.id)
             setOpen(false)
            }}>
            <Icon name='checkmark' /> Yes
            </Button>
            </Modal.Actions>
             </Modal>
            <Button as={Link} to={`/manage/${patient.id}`} color='purple'>
                    Modify patient's data
                </Button>
            </Segment>
    )
})