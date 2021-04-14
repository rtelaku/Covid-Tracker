import React, { SyntheticEvent, useState } from 'react';
import { Button, Item , ItemMeta, Label, Segment} from 'semantic-ui-react';
import { Patient } from '../../../app/models/patient';

interface Props{
    patients: Patient[];
    
    selectPatient:(id: string)=>void;
    deletePatient:(id: string) => void;
    submitting:boolean;

}

export default function PatientList({patients,selectPatient,deletePatient,submitting}: Props){
    const[target, setTarget] = useState('');

    function handlePatientDelete(e: SyntheticEvent<HTMLButtonElement>, id: string){
        setTarget(e.currentTarget.name); 
        deletePatient(id);
        
    }
    
    return(
        <Segment>
            <Item.Group divided>
                {patients.map(patient =>(
                    <Item key={patient.id}>
                        <Item.Content>
                        <Item.Header as='a'>{patient.name}</Item.Header>
                        <Item.Meta>{patient.date}</Item.Meta>
                        <Item.Description>
                            <div>{patient.description}</div>
                            <div>{patient.city}</div>
                            </Item.Description> 
                            <Item.Extra>
                                <Button onClick={()=>selectPatient(patient.id)} floated='right' content='View' color='blue'/>
                                <Button
                                name={patient.id} 
                                loading={submitting && target===patient.id}
                                 onClick={(e)=>handlePatientDelete(e, patient.id)}
                                 floated='right' content='Delete' 
                                 color='red'/>
                                <Label basic content={patient.category}/>
                                </Item.Extra>
                            </Item.Content>
                            </Item>
                ))}

            </Item.Group>
        </Segment>

    )
}