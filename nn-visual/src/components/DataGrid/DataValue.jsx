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

    const handleKeyDown = (e) => {
        const { key } = e;
        const keys = ["Escape", "Tab"];
        const enterKey = "Enter";
        const allKeys = [...keys, enterKey];
        if (allKeys.indexOf(key) > -1) {
          setEditing(false);
        }
        console.log(key)
        /*if(!isFinite(key) && key !== "Backspace" && key !== "." )
            e.preventDefault();*/

      };

    let display;
    let class_n = styles.entry_value + " "
    if(props.label)
        class_n += styles.entry_label + " "
    if(props.separator)
        class_n += styles.entry_separator + " "

    if(props.separator)
        return <div className={class_n}/>
    
    /*
    if(editing){
            display =
                <div className={class_n} onBlur={() => setEditing(false)} onKeyDown={e => handleKeyDown(e)}> 
                    {input}
                </div>
    }
    else
        if(props.label){
            display = <div className={class_n} >
                        <span onClick={() => setEditing(true)}>{props.value}</span>
                        <button onClick={() => props.remove()}>X</button>
                    </div>
        }else{
            display = <div className={class_n} >
                        <span onClick={() => setEditing(true)}>{props.value}</span>
                    </div>
        }
    */

   if(props.label){
    display = <div className={class_n} >
                    {input}
                    <button onClick={() => props.remove()}>X</button>
                </div>
    }else{
        display = <div className={class_n} >
                    {input}
                </div>
    }


    return display

}
/*
class DataValue extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            editing : false,
            setEdit : false,
        }
        this.inputRef = React.createRef();
        this.input = <input ref={this.inputRef} type="text" value={this.props.value} />;
    }

    handleKeyDown(event){
        console.log(event)
    };

    setEdit(val){
        this.setState({
            setEdit:true
        })
    }
    setEditing(val){
        this.setState({
            editing:val
        })
    }

    componentDidMount(){
        console.log("mount")
    }

    render(){
        let display;
        if(this.state.editing){
            display = (
                <div className={styles.entry_value} onBlur={() => this.setEditing(false)} onKeyDown={e => this.handleKeyDown(e)}>
                    {this.input}
                </div>
            )
            //this.inputRef.current.focus();
        }
        else
            display = (
                <div className={styles.entry_value} onClick={() => this.setEditing(true)} > {this.props.value} </div>
            )
        return (
            display
        )
    }
}*/

export default DataValue;