import React, {useState, useEffect}  from 'react';
import {NativeSelect, FormControl} from '@material-ui/core';
import styles from './CityPicker.module.css';
import { cityOptions } from '../../../app/common/options/cityOptions';
import MySelectInput from '../../../app/common/form/MySelectInput';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';


const CityPicker = () => {
 
    function handleFormSubmit(){
      
        }
        const validationSchema = Yup.object({
            city: Yup.string().required('City is required'),
        })

    return(
        <div className ={styles.formControl}>
        <Formik 
        validationSchema={validationSchema}
        enableReinitialize initialValues={cityOptions} onSubmit={values => handleFormSubmit(values)}>
            {({handleSubmit, isValid, isSubmitting, dirty}) => (
             <Form className='ui form' onSubmit={handleSubmit} autoComplete='off' >
            
            <MySelectInput options={cityOptions} placeholder='Cities' name='cities'/>
          
                        
            </Form>
            )}
        </Formik>
        </div>
    )
}

export default CityPicker;