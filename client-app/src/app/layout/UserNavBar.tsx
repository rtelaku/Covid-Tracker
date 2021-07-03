import { observer } from 'mobx-react-lite';
import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Button, Container, Menu, Image, Dropdown } from 'semantic-ui-react';
import { useStore } from '../stores/store';

export default observer( function UserNavBar(){
    const {userStore: {user, logout}}= useStore();

    return(
        <Menu inverted fixed='top'>
            <Container>
                <Menu.Item as={NavLink} to='/' exact header>
                    <img src="/assets/viruslogo.png" alt="logo" style={{marginRight: '10px'}}/> 
                    Covid Tracker
                </Menu.Item>
                
                <Menu.Item position='right'>
                <Menu.Item as={NavLink} to='/doctors' name='Doctors'/>
                <Menu.Item as={NavLink} to='/vaccinations' name='Vaccination Centers' />
                </Menu.Item>
            </Container>
        </Menu>
    )
})