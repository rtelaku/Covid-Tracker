import { observer } from 'mobx-react-lite';
import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Button, Container, Menu, Image, Dropdown } from 'semantic-ui-react';
import { useStore } from '../stores/store';

export default observer( function DoctorNavBar(){
    const {userStore: {user, logout}}= useStore();

    return(
        <Menu inverted fixed='top'>
            <Container>
                <Menu.Item as={NavLink} to='/admin' exact header>
                    <img src="/assets/viruslogo.png" alt="logo" style={{marginRight: '10px'}}/> 
                    Covid Tracker
                </Menu.Item>
               
                <Menu.Item position='right'>
                <Menu.Item as={NavLink} to='/patients' name='Patients'/>
                <Menu.Item as={NavLink} to='/vaccinations' name='Vaccination Centers'/>
                <Menu.Item as={NavLink} to='/doctors' name='Doctors'/>
                <Menu.Item as={NavLink} to='/createPatient' positive content='New case' />
                    <Image src={user?.image || '/assets/user.png'} avatar spaced='right' />
                    <Dropdown pointing='top left' text={user?.displayName}>
                        <Dropdown.Menu>
                            <Dropdown.Item as={Link} to={`/profiles/${user?.username}`} 
                                text='My Profile' icon='user' />
                            <Dropdown.Item onClick={logout} text='Logout' icon='power' />
                        </Dropdown.Menu>
                    </Dropdown>
                </Menu.Item>
            </Container>
        </Menu>
    )
})