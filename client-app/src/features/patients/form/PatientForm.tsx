import React, { useState } from 'react';
import { ChangeEvent } from 'react';
import { Button, Form, Segment } from 'semantic-ui-react';
import { Patient } from '../../../app/models/patient';

interface Props{
    patient: Patient | undefined;
    closeForm:()=>void;
    createOrEdit: (patient: Patient)=>void;
    submitting:boolean;
}
export default function PatientForm({patient:selectedPatient , closeForm ,
    createOrEdit, submitting}: Props){
 
 const initialState = selectedPatient ?? {
     id: '',
     name:'',
     category:'',
     description:'',
     date: '',
     city: ''
 }
 const[patient, setPatient] = useState(initialState);

 function handleSubmit(){
     createOrEdit(patient);
 }
 function handleInputChange(event: ChangeEvent<HTMLInputElement |HTMLTextAreaElement>){
        const {name, value} =event.target;
        setPatient({...patient, [name]:value});
 }

    return(
        <Segment clearing>
            <Form onSubmit={handleSubmit} autoComplete='off' >
                <Form.Input placeholder='Name' value={patient.name} name='name' onChange={handleInputChange} />
                <Form.TextArea placeholder='Description' value={patient.description} name='description' onChange={handleInputChange}/>
                <Form.Input placeholder='Category' value={patient.category} name='category' onChange={handleInputChange}/>
                <Form.Input type='date' placeholder='Date' value={patient.date} name='date' onChange={handleInputChange}/>
                <Form.Input placeholder='City' value={patient.city} name='city' onChange={handleInputChange}/>
                <Button loading={submitting} floated='right' positive type='submit' content='Submit'/>
                <Button onClick={closeForm} floated='right'  type='button' content='Cancel'/>
            </Form>
        </Segment>
    )
}