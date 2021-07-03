import React, { SyntheticEvent } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Icon, Item, Segment } from 'semantic-ui-react';
import { Patient } from '../../../app/models/patient';
import { useStore } from '../../../app/stores/store';
import { format } from 'date-fns';

interface Props{
    patient: Patient
}

export default function PatientListItem({patient}:Props){

    const {patientStore} = useStore();
    const {deletePatient, loading} = patientStore;
    const[target, setTarget] = useState('');

    function handlePatientDelete(e: SyntheticEvent<HTMLButtonElement>, id: string){
        setTarget(e.currentTarget.name); 
        deletePatient(id);
    }
    return(
        <Segment.Group>
            <Segment>
                <Item.Group>
                    <Item>                
                        <Item.Image size='tiny' circular src='/assets/user.png' /> 
                        <Item.Content>
                            <Item.Header as={Link} to={`/patients/${patient.id}`}>
                                {patient.name}
                            </Item.Header>
                            <Segment>
                                <span>
                                    <Icon color='purple' name='birthday' />{format(patient.date!, 'MMMM d, yyyy')}
                                </span>
                            </Segment>
                        </Item.Content>
                    </Item>
                </Item.Group>
            </Segment>
                
            <Segment>
                <span>
                    <Icon color='purple' name='id card' />{patient.id}
                </span>
            </Segment>
            <Segment>
                <span>
                    <Icon color='purple' name='user' />{patient.personalId}
                </span>
            </Segment>
            <Segment>
                <span>
                <Icon color='purple' name='info' />{patient.description}
                </span>
            </Segment>
            <Segment>
                <span>
                <Icon color='purple' name='info' />{patient.category}
                </span>
            </Segment>
            <Segment clearing>
                <span>
                    <Icon color='purple' name='marker' />{patient.city}
                </span>
                <Button
                as={Link}
                to={`/patients/${patient.id}`}
                color='purple'
                floated='right'
                content='View'/>
            </Segment>
        </Segment.Group>
                
    )
}