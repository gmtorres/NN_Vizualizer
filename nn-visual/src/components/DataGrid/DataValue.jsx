import React , { useState, useEffect } from 'react';

import styles from './DataGrid.module.css'


function DataValue(props){
    const [editing, setEditing] = useState(false);
    const inputRef=  React.createRef();
    const input = <input ref={inputRef} type="text" value={props.value} onChange={e => props.callback(e.target.value)}/>;

    useEffect(() => {
        if (inputRef && inputRef.current && editing === true) {
            inputRef.current.focus();
        }
    });



    let display;
    let class_n = styles.entry_value + " "
    if(props.label)
        class_n += styles.entry_label + " "
    if(props.separator)
        class_n += styles.entry_separator + " "

    if(props.separator)
        return <div className={class_n}/>

    let button
    if(props.label)
        button = <button onClick={() => props.remove()}>X</button>
    display = (
            <div className={class_n} onClick={() => setEditing(true)}>
                {input}
                {button}
            </div>
            )


    return display

}
export default DataValue;