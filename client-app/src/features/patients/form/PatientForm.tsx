import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import { ChangeEvent } from 'react';
import { useHistory, useParams } from 'react-router';
import { Button, Grid, Header, Item, Segment } from 'semantic-ui-react';
import LoadingComponents from '../../../app/layout/LoadingComponents';
import { useStore } from '../../../app/stores/store';
import {v4 as uuid} from 'uuid';
import { Link } from 'react-router-dom';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import MyTextInput from '../../../app/common/form/MyTextInput';
import MyTextArea from '../../../app/common/form/MyTextArea';
import MySelectInput from '../../../app/common/form/MySelectInput';
import { categoryOptions } from '../../../app/common/options/categoryOptions';
import MyDateInput from '../../../app/common/form/MyDateInput';
import { Patient } from '../../../app/models/patient';
import { cityOptions } from '../../../app/common/options/cityOptions';


export default observer (function PatientForm(){
        const history = useHistory();
        const {patientStore} = useStore();
        const {createPatient, updatePatient, loading, loadPatient, loadingInitial} = patientStore;
        const {id} = useParams<{id: string}>();
        const[patient, setPatient] = useState<Patient>({
            id: '',
            name:'',
            personalId: '',
            dateOfBirth: null,
            category:'',
            description:'',
            date: null,
            city: '' 
        });

        const validationSchema = Yup.object({
            name: Yup.string().required('Patient name is required'),
            personalId: Yup.string().required('Patient name is required'),
            description: Yup.string().required('Patient description is required'),
            category: Yup.string().required('Patient category is required'),
            date: Yup.string().required('Date is required').nullable(),
            city: Yup.string().required('Patient city is required'),
        })

        useEffect(() => {
            if(id) loadPatient(id).then(patient => setPatient(patient!))
        }, [id, loadPatient])

        if(loadingInitial) return <LoadingComponents content='Loading patient...' />
 
 function handleFormSubmit(patient: Patient){
    if (patient.id.length === 0){
        let newPatient = {
            ...patient,
            id: uuid()
        };
        createPatient(newPatient).then(() => history.push(`/patients/${newPatient.id}`))
    } else {
        updatePatient(patient).then(()=> history.push(`/patients/${patient.id}`))
    }
 }


    return(
        <Segment clearing>
        <Header content='Patient Details' sub color='purple'/>
        <Formik 
        validationSchema={validationSchema}
        enableReinitialize initialValues={patient} onSubmit={values => handleFormSubmit(values)}>
            {({handleSubmit, isValid, isSubmitting, dirty}) => (
             <Form className='ui form' onSubmit={handleSubmit} autoComplete='off' >
             <MyTextInput name='name' placeholder='Name'/>
             <MyTextInput name='personalId' placeholder='Personal ID'/>
             <MyDateInput 
                            placeholderText='DateOfBirth'  
                            name='dateOfBirth' 
                            showTimeSelect
                            timeCaption='time'
                            dateFormat='MMMM d, yyyy'
                        />
            <MySelectInput options={categoryOptions} placeholder='Category' name='category'/>
             <MyTextArea rows={3} placeholder='Description' name='description'/>
             <MyDateInput 
                            placeholderText='Date'  
                            name='date' 
                            showTimeSelect
                            timeCaption='time'
                            dateFormat='MMMM d, yyyy'
                        />
             <Header content='Location Details' sub color='purple'/>
             <MySelectInput options={cityOptions} placeholder='City' name='city'/>
             <Button 
             disabled={isSubmitting || !dirty || !isValid}
             loading={loading} 
             floated='right' 
             positive 
             type='submit' 
             content='Submit'
             />
             <Button as={Link} to='/patients' floated='right'  type='button' content='Cancel'/>
            </Form>
            )}
        </Formik>
        </Segment>
    )
})