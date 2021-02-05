import React, { useState } from 'react';

import styles from './RangeBar.module.css'

function RangeBar(props){
    const step = props.step ? props.step : 1;
    let transform = (val) => {
        if(props.type === "log"){
            val = Math.exp(val);
        }
        return val;
    }

    let inverse = (val) => {
        if(props.type === "log"){
            val = Math.log(val);
        }
        return val;
    }

    const [value, setValue] = useState(props.value ? inverse(props.value) : inverse((props.max-props.min)/2));
    const [displayValue , setDisplayValue] = useState(props.value ? props.value : value)

    let handleChange = (e) =>{
        let val = step === 1 ? parseInt(e.target.value) : parseFloat(e.target.value);
        setValue(val);
        val = transform(val)
        step === 1 ? setDisplayValue(val) : setDisplayValue(val.toFixed(5));
        if(props.callback)
            props.callback(val)
    }
    const elem = (
            <div className={styles.slidecontainer}>
                <input type="range" min={props.min} max={props.max} value={value} step={props.step ? props.step : 1} class="slider" onChange={(e) => handleChange(e)}/>
                <span id="rs-bullet" className={styles.rs_label}>{props.info}:{displayValue}</span>
            </div>
    )
    return(
        elem
    )

}
export default RangeBar;