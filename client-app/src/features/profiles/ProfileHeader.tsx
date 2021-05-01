import React from 'react';
import { Button, ButtonOr, Grid, Header, Item, Segment} from 'semantic-ui-react';
import {Link} from 'react-router-dom';
import { useStore } from '../../app/stores/store';
import RegisterForm from '../users/RegisterForm';
import { Profile } from '../../app/models/profile';
import { observer } from 'mobx-react-lite';


interface Props {
    profile: Profile;
}

export default observer (function ProfileHeader({profile} : Props){
    const {userStore, modalStore} =useStore();
    return(
        <Segment>
            <Grid>
                <Grid.Column>
                    <Item.Group>
                        <Item>
                            <Item.Image avatar size='small' src={profile.image || '/assets/user.png'} />
                            <Item.Content verticalAlign='middle'>
                                <Header as='h1' content={profile.displayName}/>
                                <Button onClick={() => modalStore.openModal(<RegisterForm/>)} color='purple' content='Add an admin' floated='right' style={{width: '20%'}}/>
                           </Item.Content>
                        </Item>
                    </Item.Group>
                </Grid.Column>
            </Grid>
        </Segment>
    )
})