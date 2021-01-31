import React from 'react';
import DataValue from './DataValue';
import DataAux from './DataAux';

import styles from './DataGrid.module.css'

class DataEntry extends React.Component{

    constructor(props){
        super(props)
        this.key = 0;
    }

    setValue(data,index,val){
        data[index] = val
    }

    render(){

        let data = this.props.data;
        let entry = [];
        let label_in_key = 0;
        let label_out_key = 0;
        let entry_value = 0;
        if(this.props.label){
            entry.push(<DataAux key={"data_aux_separator" + this.key++} separator={true}/>)
            for(let value = 0; value < this.props.input_labels.length; value++){
                entry.push(<DataValue value={this.props.input_labels[value]} remove={this.props.remove.in.bind(this,value)} 
                        callback={this.props.callback.in.bind(this,value)} label={this.props.label}
                        key={"label_in_value" + label_in_key++}
                        />)
            }
            entry.push(<DataAux key={"data_aux_separator" + this.key++} separator={true} label={true}/>)
            for(let value = 0; value < this.props.output_labels.length; value++){
                entry.push(<DataValue value={this.props.output_labels[value]} remove={this.props.remove.out.bind(this,value)} 
                        callback={this.props.callback.out.bind(this,value)} label={this.props.label}
                        key={"label_out_value" + label_out_key++}
                        />)
            }
        }else{
            entry.push(<DataAux remove={this.props.removeEntry} key={"data_aux_separator" + this.key++}/>)
            for(let value = 0; value < data.length; value++)
                entry.push(<DataValue value={data[value]}
                    callback={this.props.callback.bind(this,value)} label={this.props.label}
                    key={"data_value" + this.props.index + "->" + entry_value++}
                    />)
            entry.splice(this.props.in_size+1,0,<DataValue separator={true} key={"data_aux_separator" + this.key++}/>)
        }
        let classname = styles.entry;
        if(this.props.active)
            classname += " " + styles.active
        return (
                <div className={classname}>
                    {entry}
                </div>
        )
    }
}

export default DataEntry;