import React from 'react';
import DataEntry from './DataEntry';

import styles from './DataGrid.module.css'

class DataGrid extends React.Component{

    constructor(props){
        super();
    }

    render(){
        let grid = [];

        let changes = this.props.changes;

        grid.push(<DataEntry 
                    input_labels={this.props.input_labels} 
                    output_labels={this.props.output_labels} 
                    ref={this} 
                    remove={changes.remove}
                    callback={changes.changeLabels} 
                    label={true}
                />)
        
        let data = this.props.data
        let in_size = this.props.input_labels.length
        let out_size = this.props.output_labels.length
        for(let entry = 0; entry < data.length; entry++){
            grid.push(<DataEntry in_size={in_size} out_size={out_size} data={data[entry]} ref={this} callback={changes.changeData.bind(this,entry)}/>)
        }
        return (
            <div key={"Grid_" + this.key++} className={styles.grid_wrapper}>
                <div className={styles.grid_container}>
                    {grid}
                    
                    <div className={styles.grid_container_buttons}>
                        <button onClick={changes.addEntry.bind(this)}>Add entry</button>
                        <button onClick={changes.addInput.bind(this)}>Add Input</button>
                        <button onClick={changes.addOutput.bind(this)}>Add Output</button>
                    </div>

                </div>
            </div>
            
        )
    }
}

export default DataGrid;