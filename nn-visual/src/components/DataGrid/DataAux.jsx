import React from 'react';

import styles from './DataGrid.module.css'


function DataAux (props){

    let class_n = styles.entry_value + " "
    if(props.label)
        class_n += styles.entry_label + " "
    if(props.separator)
        class_n += styles.entry_separator + " "
    else
        class_n += styles.entry_button + " "

    if(props.separator)
        return <div className={class_n}/>
    else
        return <div className={class_n}> 
                    <button onClick={() => props.remove()}>X</button>
                </div>

}


export default DataAux;