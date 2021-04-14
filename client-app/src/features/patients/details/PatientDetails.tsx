import React from 'react';
import { Card, Image, Icon, Button } from 'semantic-ui-react';
import { Patient } from '../../../app/models/patient';

interface Props{
    patient: Patient
    cancelSelectPatient: ()=> void;
    openForm:(id: string) =>void;
    submitting:boolean;
  }


export default function PatientDetails({ patient, cancelSelectPatient, openForm, submitting }: Props){
    return(
        <Card fluid>
        <Image src={'/assets/categoryImages/${patient.category}.jpg'} />
        <Card.Content>
          <Card.Header>{patient.name}</Card.Header>
          <Card.Meta>
            <span className='date'>{patient.date}</span>
          </Card.Meta>
          <Card.Description>
            Matthew is a musician living in Nashville.
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
            <Button onClick={()=>openForm(patient.id)} basic color='blue' content='Edit' />
            <Button onClick={cancelSelectPatient} basic color='grey' content='Cancel' />

        </Card.Content>
      </Card>
    )
}