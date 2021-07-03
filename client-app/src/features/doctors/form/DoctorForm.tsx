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
import { Doctor } from '../../../app/models/doctor';
import UserNavBar from '../../../app/layout/UserNavBar';
import NavBar from '../../../app/layout/NavBar';
import { cityOptions } from '../../../app/common/options/cityOptions';


export default observer (function DoctorForm(){
        const history = useHistory();
        const {doctorStore} = useStore();
        const {createDoctor, updateDoctor, loading, loadDoctor, loadingInitial} = doctorStore;
        const {id} = useParams<{id: string}>();
        const[doctor, setDoctor] = useState<Doctor>({
            id: '',
            name:'',
            personalId: '',
            date: null,
            contactNumber:'',
            city: '',
            email: ''
        });

        const validationSchema = Yup.object({
            name: Yup.string().required('Doctor name is required'),
            personalId: Yup.string().required('Doctor ID is required'),
            date: Yup.string().required('Date is required'),
            contactNumber: Yup.string().required('Contact number is required'),
            city: Yup.string().required('Doctor city is required'),
            email: Yup.string().required('Email is required')
        })

        useEffect(() => {
            if(id) loadDoctor(id).then(doctor => setDoctor(doctor!))
        }, [id, loadDoctor]);

        if(loadingInitial) return <LoadingComponents content='Loading doctor...' />
 
 function handleFormSubmit(doctor: Doctor){
    if (doctor.id.length === 0){
        let newDoctor = {
            ...doctor,
            id: uuid()
        };
        createDoctor(newDoctor).then(() => history.push(`/doctors/${newDoctor.id}`))
    } else {
        updateDoctor(doctor).then(()=> history.push(`/doctors/${doctor.id}`))
    }
 }


    return(
        <>
        <NavBar />
        <div className="form-segment">
        <Segment clearing  className="formik-segment">
        <Header content='Doctor Details' sub color='purple'/>
        <Formik 
        validationSchema={validationSchema}
        enableReinitialize initialValues={doctor} onSubmit={values => handleFormSubmit(values)}>
            {({handleSubmit, isValid, isSubmitting, dirty}) => (
             <Form className='ui form' onSubmit={handleSubmit} autoComplete='off' >
             <MyTextInput name='name' placeholder='Name'/>
             <MyTextInput name='personalId' placeholder='Personal ID'/>
             <MyDateInput 
                            placeholderText='Date'  
                            name='date' 
                            showTimeSelect
                            timeCaption='time'
                            dateFormat='MMMM d, yyyy'
                        />
             <MyTextInput name='contactNumber' placeholder='ContactNumber'/>
             <Header content='Location Details' sub color='purple'/>
             <MySelectInput options={cityOptions} placeholder='City' name='city'/>
             
             <MyTextInput name='email' placeholder='Email'/>
             <Button 
             disabled={isSubmitting || !dirty || !isValid}
             loading={loading} 
             floated='right' 
             positive 
             type='submit' 
             content='Submit'
             />
             <Button as={Link} to='/doctors' floated='right'  type='button' content='Cancel'/>
            </Form>
            )}
        </Formik>
        </Segment>
        </div>
    </>
    )

})