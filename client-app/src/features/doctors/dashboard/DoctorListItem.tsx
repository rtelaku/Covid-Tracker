import React, { SyntheticEvent } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Icon, Item, Segment } from 'semantic-ui-react';
import { Doctor } from '../../../app/models/doctor';
import { useStore } from '../../../app/stores/store';
import { format } from 'date-fns';

interface Props{
    doctor: Doctor
}

export default function DoctorListItem({doctor}:Props){

    const {doctorStore} = useStore();
    const {deleteDoctor, loading} = doctorStore;
    const[target, setTarget] = useState('');

    function handleDoctorDelete(e: SyntheticEvent<HTMLButtonElement>, id: string){
        setTarget(e.currentTarget.name); 
        deleteDoctor(id);
    }
    return(
        <Segment.Group>
            <Segment>
                <Item.Group>
                    <Item>                
                        <Item.Image size='tiny' circular src='/assets/user.png' /> 
                        <Item.Content>
                            <Item.Header as={Link} to={`/doctors/${doctor.id}`}>
                                {doctor.name}
                            </Item.Header>
                            <Segment>
                                <span>
                                    <Icon color='purple' name='birthday' />{format(doctor.date!, 'MMMM d, yyyy')}
                                </span>
                            </Segment>
                        </Item.Content>
                    </Item>
                </Item.Group>
            </Segment>
                
            <Segment>
                <span>
                    <Icon color='purple' name='id card' />{doctor.id}
                </span>
            </Segment>
            <Segment>
                <span>
                    <Icon color='purple' name='user' />{doctor.personalId}
                </span>
            </Segment>
            <Segment>
                <span>
                <Icon color='purple' name='phone' />{doctor.contactNumber}
                </span>
            </Segment>
            
            <Segment clearing>
                <span>
                    <Icon color='purple' name='marker' />{doctor.city}
                </span>
                <Button
                as={Link}
                to={`/doctors/${doctor.id}`}
                color='purple'
                floated='right'
                content='View'/>
            </Segment>
        </Segment.Group>
                
    )
}