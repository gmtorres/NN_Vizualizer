import React from 'react';
import DataValue from './DataValue';
import DataAux from './DataAux';

import styles from './DataGrid.module.css'

class DataEntry extends React.Component{

    setValue(data,index,val){
        data[index] = val
    }

    render(){

        let data = this.props.data;
        let entry = [];

        if(this.props.label){
            entry.push(<DataAux separator={true}/>)
            for(let value = 0; value < this.props.input_labels.length; value++){
                entry.push(<DataValue value={this.props.input_labels[value]} remove={this.props.remove.in.bind(this.props.ref,value)} 
                        callback={this.props.callback.in.bind(this.props.ref,value)} label={this.props.label}/>)
            }
            entry.push(<DataValue separator={true} label={this.props.label}/>)
            for(let value = 0; value < this.props.output_labels.length; value++){
                entry.push(<DataValue value={this.props.output_labels[value]} remove={this.props.remove.out.bind(this.props.ref,value)} 
                        callback={this.props.callback.out.bind(this.props.ref,value)} label={this.props.label}/>)
            }
        }else{
            entry.push(<DataAux remove={this.props.removeEntry}/>)
            for(let value = 0; value < data.length; value++)
                entry.push(<DataValue value={data[value]}
                    callback={this.props.callback.bind(this.props.ref,value)} label={this.props.label}/>)
            entry.splice(this.props.in_size+1,0,<DataValue separator={true}/>)
        }

        return (
                <div className={styles.entry}>
                    {entry}
                </div>
        )
    }
}

export default DataEntry;