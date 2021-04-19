import React, { useEffect } from 'react';
import { Container} from 'semantic-ui-react';
import NavBar from './NavBar';
import PatientDashboard from '../../features/patients/dashboard/PatientDashboard';
import LoadingComponents from './LoadingComponents';
import { useStore } from '../stores/store';
import { observer } from 'mobx-react-lite';
import { Route, Switch } from 'react-router';
import HomePage from '../../features/home/HomePage';
import PatientForm from '../../features/patients/form/PatientForm';
import PatientDetails from '../../features/patients/details/PatientDetails';
import { useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import NotFound from '../../features/errors/NotFound';
import ServerError from '../../features/errors/ServerError';
import LoginForm from '../../features/users/LoginForm';
import ModalConatainer from '../common/modals/ModalContainer';
import ProfilePage from '../../features/profiles/ProfilePage';


function App() {

  const location = useLocation();
  const {commonStore, userStore} = useStore();

  useEffect(() => {
    if (commonStore.token) {
      userStore.getUser().finally(() => commonStore.setAppLoaded());
    } else {
      commonStore.setAppLoaded()
    }
  }, [commonStore, userStore])

  if (!commonStore.appLoaded) return <LoadingComponents content='Loading app...' />

  return (
    <>
    <ToastContainer position='bottom-right' hideProgressBar/>
    <ModalConatainer/>
    <Route exact path='/' component={HomePage} />
    <Route
    path={'/(.+)'} 
    render={() => (
      <>
      <NavBar/>
      <Container style={{marginTop: '7em'}}>
      <Switch>
      <Route exact path='/' component={HomePage} />
      <Route exact path='/patients' component={PatientDashboard} />
      <Route path='/patients/:id' component={PatientDetails} />
      <Route key={location.key} path={['/createPatient', '/manage/:id']} component={PatientForm} />
      <Route path='/server-error' component={ServerError} />
      <Route path='/login' component={LoginForm} />
      <Route path='/profiles/:username' component={ProfilePage} />
      <Route path='/server-error' component={ServerError} />
      <Route component={NotFound}/>
      </Switch>
      </Container>
      </>
    )}
    />
    </>
  );
}

export default observer (App);

