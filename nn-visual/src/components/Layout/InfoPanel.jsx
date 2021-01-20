import React from 'react';
import InfoBasic from '../Info/InfoBasic';

import styles from './Layout.module.css'
import Topbar from './Topbar/Topbar';


class InfoPanel extends React.Component{

    constructor(props){
        super();
        this.state = {
            tabName : 'Introduction',
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
            <div className={styles.InfoPanel_wrapper}>
                <div>
                    <Topbar onClick={this.onClick.bind(this)} current={this.state.tabName}/>
                </div>
                <div className={styles.InfoPanel_content    }>
                    <div className={styles.content_wrapper}>
                        {this.state.current}
                    </div>
                </div>
            </div>
            
        )
    }

}

export default InfoPanel;


/*
<div className={styles.leftPane_content_wrapper}>
                <Topbar onClick={this.onClick.bind(this)} current={this.state.tabName}/>
                <div className={styles.content_wrapper}>
                    {this.state.current}
                </div>
            </div>
*/