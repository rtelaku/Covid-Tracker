import React from 'react';
import { Tab, TabPane } from 'semantic-ui-react';
import { Profile } from '../../app/models/profile';
import ProfileAbout from './ProfileAbout';
import ProfilePhotos from './ProfilePhotos';

interface Props {
  profile: Profile;
}

export default function ProfileContent({profile} : Props){
    const panes = [
        {
          menuItem: 'About',
          render: () => <ProfileAbout />,
        },
        { menuItem: 'Photos', render: () => <ProfilePhotos profile={profile} /> },
      ]
      
    
    return(
        <Tab color='purple'
        menu={{fluid: true, vertical: false}}
        
        panes={panes}
        />
    )
}