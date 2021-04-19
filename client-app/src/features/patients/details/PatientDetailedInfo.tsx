import { observer } from 'mobx-react-lite';
import React from 'react'
import {Segment, Grid, Icon} from 'semantic-ui-react'
import {Patient} from "../../../app/models/patient";
import { format } from 'date-fns';

interface Props {
    patient: Patient
}

export default observer(function PatientDetailedInfo({patient}: Props) {
    return (
        <Segment.Group>
            <Segment attached='top'>
                <Grid>
                    <Grid.Column width={1}>
                        <Icon size='large' color='purple' name='info'/>
                    </Grid.Column>
                    <Grid.Column width={15}>
                        <p>{patient.description}</p>
                    </Grid.Column>
                </Grid>
            </Segment>
            <Segment attached>
                <Grid verticalAlign='middle'>
                    <Grid.Column width={1}>
                        <Icon name='calendar' size='large' color='purple'/>
                    </Grid.Column>
                    <Grid.Column width={15}>
            <span>
              {format(patient.date!, 'dd MMM yyyy h:mm aa')}
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
                        <span> {patient.city}</span>
                    </Grid.Column>
                </Grid>
            </Segment>
        </Segment.Group>
    )
})