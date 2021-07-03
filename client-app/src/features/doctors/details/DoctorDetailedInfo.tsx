import { observer } from 'mobx-react-lite';
import React from 'react'
import {Segment, Grid, Icon} from 'semantic-ui-react'
import { format } from 'date-fns';
import { Doctor } from '../../../app/models/doctor';

interface Props {
    doctor: Doctor
}

export default observer(function DoctorDetailedInfo({doctor}: Props) {
    return (
        <Segment.Group>
            <Segment attached='top'>
                <Grid>
                    <Grid.Column width={1}>
                        <Icon size='large' color='purple' name='user'/>
                    </Grid.Column>
                    <Grid.Column width={15}>
                        <p>{doctor.personalId}</p>
                    </Grid.Column>
                </Grid>
            </Segment>
            <Segment>
                <Grid verticalAlign='middle'>
                    <Grid.Column width={1}>
                        <Icon size='large' color='purple' name='info'/>
                    </Grid.Column>
                    
                </Grid>
            </Segment>
            <Segment attached>
            <Grid verticalAlign='middle'>
                </Grid>
                <Grid verticalAlign='middle'>
                    <Grid.Column width={1}>
                        <Icon name='calendar' size='large' color='purple'/>
                    </Grid.Column>
                    <Grid.Column width={15}>
            <span>
              {format(doctor.date!, 'MMMM d, yyyy')}
            </span>
                    </Grid.Column>
                </Grid>
            </Segment>
            <Segment attached>
                <Grid verticalAlign='middle'>
                    
                    <Grid.Column width={1}>
                        <Icon name='marker' size='large' color='purple'/>
                    </Grid.Column>
                    <Grid.Column width={11}>
                        <span> {doctor.city}</span>
                    </Grid.Column>
                </Grid>
            </Segment>
        </Segment.Group>
    )
})