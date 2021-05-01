import { Field, Form, Formik } from "formik";
import { observer } from "mobx-react-lite";
import { Button } from "semantic-ui-react";
import MyTextArea from "../../app/common/form/MyTextArea";
import MyTextInput from "../../app/common/form/MyTextInput";
import { useStore } from "../../app/stores/store";
import * as Yup from 'yup';
import React from "react";

interface Props {
    setEditMode: (editMode: boolean) => void;
}



export default observer(function ProfileEditForm({setEditMode}: Props) {
    const {profileStore: {profile, updateProfile, isCurrentUser}} = useStore();
    return (
        <Formik
            initialValues={{displayName: profile?.displayName, bio: profile?.bio, email:profile?.email, password: profile?.password}}
            onSubmit={values => {
                updateProfile(values).then(() => {
                    setEditMode(false);
                })
            }}
            validationSchema={Yup.object({
                displayName: Yup.string().required(),             
                email: Yup.string().required(),             
                               
            })}
        >
            {({isSubmitting, isValid, dirty}) => (
                <Form className='ui form'>
                    <MyTextInput placeholder='Display Name' name='displayName' />
                    <MyTextInput placeholder='Email' name='email' />
                    <Field type='password' placeholder='Password' name='password' />
                    <MyTextArea rows={3} placeholder='Add your bio' name='bio' />
                    <Button 
                        positive
                        type='submit'
                        loading={isSubmitting}
                        content='Update profile'
                        floated='right'
                        disabled={!isValid || !dirty}
                    />
                </Form>
            )}
        </Formik>
    )
})