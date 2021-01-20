import React from 'react';
import DataEntry from './DataEntry';

import styles from './DataGrid.module.css'

class DataGrid extends React.Component{

    constructor(props){
        super();
        this.key = 0;
    }

    render(){
        let grid = [];

        let changes = this.props.changes;


        let lables = <DataEntry /*key={"grid_labels_" + this.key++}*/
                    input_labels={this.props.input_labels} 
                    output_labels={this.props.output_labels} 
                    remove={changes.remove}
                    callback={changes.changeLabels} 
                    label={true}
                />
        
        let data = this.props.data
        let in_size = this.props.input_labels.length
        let out_size = this.props.output_labels.length
        for(let entry = 0; entry < data.length; entry++){
            grid.push(<DataEntry key={"grid_entry_" + entry}
                        in_size={in_size} out_size={out_size} 
                        data={data[entry]}
                        index = {entry}
                        callback={changes.changeData.bind(this,entry)}
                        removeEntry={changes.removeDataEntry.bind(this,entry)}
                        />)
        }
        return (
            <div /*key={"Grid_" + this.key++}*/ className={styles.grid_wrapper}>
                <div className={styles.grid_container}>
                    {lables}
                    <div style={{overflowY:'auto',flex:'1 0 auto',overflowX:'hidden'}}>
                        <div style={{minHeight:'min-content',height:'0'}}>
                            {grid} 
                        </div>                 
                    </div>
                </div>
                <div className={styles.grid_container_buttons}>
                    <button onClick={changes.addInput.bind(this)}>Add Input</button>
                    <button onClick={changes.addEntry.bind(this)}>Add entry</button>
                    <button onClick={changes.addOutput.bind(this)}>Add Output</button>
                </div>
            </div>
            
        )
    }
}

export default DataGrid;