import React, { SyntheticEvent } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Icon, Item, Segment } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import { format } from 'date-fns';
import { Vaccination } from '../../../app/models/vaccination';

interface Props{
    vaccination: Vaccination
}

export default function VaccinationListItem({vaccination}:Props){

    const {vaccinationStore} = useStore();
    const {deleteVaccination, loading} = vaccinationStore;
    const[target, setTarget] = useState('');

    function handleVaccinationDelete(e: SyntheticEvent<HTMLButtonElement>, id: string){
        setTarget(e.currentTarget.name); 
        deleteVaccination(id);
    }
    return(
        <Segment.Group>
            <Segment>
                <Item.Group>
                    <Item>                
                        <Item.Image size='tiny' circular src='/assets/user.png' /> 
                        <Item.Content>
                            <Item.Header as={Link} to={`/vaccinations/${vaccination.id}`}>
                                {vaccination.name}
                            </Item.Header>
                           
                        </Item.Content>
                    </Item>
                </Item.Group>
            </Segment>
                
            <Segment>
                <span>
                    <Icon color='purple' name='id card' />{vaccination.id}
                </span>
            </Segment>
            <Segment>
                <span>
                    <Icon color='purple' name='user' />{vaccination.personalId}
                </span>
            </Segment>
            <Segment>
                <span>
                <Icon color='purple' name='phone' />{vaccination.contactNumber}
                </span>
            </Segment>
            
            <Segment clearing>
                <span>
                    <Icon color='purple' name='marker' />{vaccination.city}
                </span>
                <Button
                as={Link}
                to={`/vaccinations/${vaccination.id}`}
                color='purple'
                floated='right'
                content='View'/>
            </Segment>
        </Segment.Group>
                
    )
}