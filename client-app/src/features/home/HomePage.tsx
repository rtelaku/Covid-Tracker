import { observer } from 'mobx-react-lite';
import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Header, Segment, Image, Button } from 'semantic-ui-react';
import { useStore } from '../../app/stores/store';
import LoginForm from '../users/LoginForm';

export default observer(function HomePage(){
    const {userStore, modalStore} =useStore();
    return(
      <Segment inverted textAlign='center' vertical className='masthead'>

          <Container  text>
                <Header as='h1' inverted>
                    <Image size='massive' src='/assets/viruslogo.png' alt='logo' style={{marginBottom: 12}}/>
                    Covid Tracker
                </Header>
                {userStore.isLoggedIn ? (
                    <>
                     
                     <Button as={Link} to='/patients' size='huge' inverted clearify>
                        Get back to patients
                    </Button>
                    </>

                ):(
                    <>
                    <Button onClick={() => modalStore.openModal(<LoginForm />)} size='huge' inverted>
                        Login
                </Button>

                </>
                )}    
          </Container>
      </Segment>
    )
})