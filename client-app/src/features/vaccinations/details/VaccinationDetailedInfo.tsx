import { observer } from 'mobx-react-lite';
import React from 'react'
import {Segment, Grid, Icon} from 'semantic-ui-react'
import { format } from 'date-fns';
import { Vaccination } from '../../../app/models/vaccination';

interface Props {
    vaccination: Vaccination
}

export default observer(function VaccinationDetailedInfo({vaccination}: Props) {
    return (
        <Segment.Group>
            <Segment attached='top'>
                <Grid>
                    <Grid.Column width={1}>
                        <Icon size='large' color='purple' name='user'/>
                    </Grid.Column>
                    <Grid.Column width={15}>
                        <p>{vaccination.personalId}</p>
                    </Grid.Column>
                </Grid>
            </Segment>
            <Segment>
                <Grid verticalAlign='middle'>
                    <Grid.Column width={1}>
                        <Icon size='large' color='purple' name='info'/>
                    </Grid.Column>
                    <Grid.Column width={10}>
                        <p>{vaccination.capacity}</p>
                    </Grid.Column>
                </Grid>
            </Segment>
            <Segment>
                <Grid verticalAlign='middle'>
                    <Grid.Column width={1}>
                        <Icon size='large' color='purple' name='clock'/>
                    </Grid.Column>
                    <Grid.Column width={10}>
                        <p>{vaccination.schedule}</p>
                    </Grid.Column>
                </Grid>
            </Segment>
            <Segment>
                <Grid verticalAlign='middle'>
                    <Grid.Column width={1}>
                        <Icon size='large' color='purple' name='phone'/>
                    </Grid.Column>
                    <Grid.Column width={10}>
                        <p>{vaccination.contactNumber}</p>
                    </Grid.Column>
                </Grid>
            </Segment>
            <Segment attached>
            <Grid verticalAlign='middle'>
                </Grid>
                <Grid verticalAlign='middle'>
                <Grid.Column width={1}>
                        <Icon size='large' color='purple' name='mail'/>
                    </Grid.Column>
                    <Grid.Column width={10}>
                        <p>{vaccination.email}</p>
                    </Grid.Column>
              
                </Grid>
            </Segment>
            <Segment attached>
                <Grid verticalAlign='middle'>
                    
                    <Grid.Column width={1}>
                        <Icon name='marker' size='large' color='purple'/>
                    </Grid.Column>
                    <Grid.Column width={11}>
                        <span> {vaccination.city}</span>
                    </Grid.Column>
                </Grid>
            </Segment>
        </Segment.Group>
    )
})