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
import MyDateInput from '../../../app/common/form/MyDateInput';
import NavBar from '../../../app/layout/NavBar';
import { cityOptions } from '../../../app/common/options/cityOptions';
import { Vaccination } from '../../../app/models/vaccination';


export default observer (function VaccinationForm(){
        const history = useHistory();
        const {vaccinationStore} = useStore();
        const {createVaccination, updateVaccination, loading, loadVaccination, loadingInitial} = vaccinationStore;
        const {id} = useParams<{id: string}>();
        const[vaccination, setVaccination] = useState<Vaccination>({
            id: '',
            name:'',
            personalId: '',
            capacity:'',
            schedule:'',
            contactNumber:'',
            email: '',
            city:''
        });

        const validationSchema = Yup.object({
            name: Yup.string().required('Vaccination center name is required'),
            personalId: Yup.string().required(' ID is required'),
            capacity: Yup.string().required('Capacity is required'),
            schedule: Yup.string().required('Work hours are required'),
            contactnumber: Yup.string().required('Contact number is required'),
            email: Yup.string().required('Email is required'),
            city:Yup.string().required('City is required')
        })

        useEffect(() => {
            if(id) loadVaccination(id).then(vaccination => setVaccination(vaccination!))
        }, [id, loadVaccination]);

        if(loadingInitial) return <LoadingComponents content='Loading vaccination center...' />
 
 function handleFormSubmit(vaccination: Vaccination){
    if (vaccination.id.length === 0){
        let newVaccination = {
            ...vaccination,
            id: uuid()
        };
        createVaccination(newVaccination).then(() => history.push(`/vaccinations/${newVaccination.id}`))
    } else {
        updateVaccination(vaccination).then(()=> history.push(`/vaccinations/${vaccination.id}`))
    }
 }


    return(
        <>
        <NavBar />
        <div className="form-segment">
        <Segment clearing  className="formik-segment">
        <Header content='Vaccination centers Details' sub color='purple'/>
        <Formik 
        validationSchema={validationSchema}
        enableReinitialize initialValues={vaccination} onSubmit={values => handleFormSubmit(values)}>
            {({handleSubmit, isValid, isSubmitting, dirty}) => (
             <Form className='ui form' onSubmit={handleSubmit} autoComplete='off' >
             <MyTextInput name='name' placeholder='Name'/>
             <MyTextInput name='personalId' placeholder='Personal ID'/>
             <MyTextInput name='capacity' placeholder='capacity'/>
             <MyTextInput name='schedule' placeholder='schedule'/>
             <MyTextInput name='contactNumber' placeholder='ContactNumber'/>
             <Header content='Location Details' sub color='purple'/>
             <MyTextInput name='email' placeholder='Email'/>
             <MySelectInput options={cityOptions} placeholder='City' name='city'/>
            <Button 
             disabled={isSubmitting || !dirty || !isValid}
             loading={loading} 
             floated='right' 
             positive 
             type='submit' 
             content='Submit'
             />
             <Button as={Link} to='/vaccinations' floated='right'  type='button' content='Cancel'/>
            </Form>
            )}
        </Formik>
        </Segment>
        </div>
    </>
    )

})