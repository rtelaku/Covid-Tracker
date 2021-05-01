import React, {useState, useEffect}  from 'react';
import {NativeSelect, FormControl} from '@material-ui/core';
import styles from './CityPicker.module.css';


const CityPicker = () => {
    return(
        <FormControl className={styles.formControl}>
            <NativeSelect>
                <option value="cities">Cities</option>
            </NativeSelect>
        </FormControl>
    )
}

export default CityPicker;