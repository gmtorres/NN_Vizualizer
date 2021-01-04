import React from 'react';
import InfoBasic from '../Info/InfoBasic';

import styles from './Layout.module.css'
import Topbar from './Topbar/Topbar';


class InfoPanel extends React.Component{

    constructor(props){
        super();
        this.state = {
            tabName : 'Basic Info',
            current : <InfoBasic/>
        }
    }

    onClick(tabName,component){
        this.setState({
            tabName : tabName,
            current : component
        })
    }

    render(){
        return (
            <div>
                <Topbar onClick={this.onClick.bind(this)} current={this.state.tabName}/>
                <div className={styles.content_wrapper}>
                    {this.state.current}
                </div>
            </div>
            
        )
    }

}

export default InfoPanel;