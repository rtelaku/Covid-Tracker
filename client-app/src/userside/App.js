import React from 'react';

import { Cards, Chart, CityPicker} from './components';
import styles from './App.module.css';
import { fetchData } from '../../src/userside/api';

class App extends React.Component {
    state = {
        data: {},
    }

async componentDidMount() {
    const fetchedData = await fetchData();

    this.setState({data: fetchedData });
}

    render() {
        const { data } = this.state;
        return (
        <div className={styles.container}>
         <Cards data={data}/>
         <CityPicker />
         <Chart />
         </div>
        );
    }     
}

export default App;