import React from 'react';
import { Button, Grid, Header, Item, Segment} from 'semantic-ui-react';
import {Link} from 'react-router-dom';
import { useStore } from '../../app/stores/store';
import RegisterForm from '../users/RegisterForm';

export default function ProfileHeader(){
    const {userStore, modalStore} =useStore();
    return(
        <Segment>
            <Grid>
                <Grid.Column>
                    <Item.Group>
                        <Item>
                            <Item.Image avatar size='small' src={'/assets/user.png'} />
                            <Item.Content verticalAlign='middle'>
                                <Header as='h1' content='Displayname'/>
                                <Button onClick={() => modalStore.openModal(<RegisterForm/>)} color='teal' content='Add an admin' floated='right' style={{width: '20%'}}/>
                                <Button color='purple' content='Edit profile' floated='right' style={{width: '20%'}}/>
                           </Item.Content>
                        </Item>
                    </Item.Group>
                </Grid.Column>
            </Grid>
        </Segment>
    )
}