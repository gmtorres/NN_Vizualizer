import React from 'react';

import NeuralNetwork from '../../NeuralNetwork/NeuralNetwork'
import VisualNN from '../Visual/VisualNN'

import styles from './Layout.module.css'

class Layout extends React.Component{

    constructor(props){
        super();
        this.state = {
            nn : new NeuralNetwork()
        }
    }
    /*  
        <div className={styles.leftPane}>
            Hey    
        </div>
        <div className={styles.rightPane}>
            <VisualNN/>
        </div>*/
    render(){
        return (
            <div className={styles.splitScreen}>
                <div className={styles.leftPane}>

                    <div className={styles.content_wrapper}>
                        HeyHeyHeyHeyHeyHeyHeyHeyHeyHeyHeyHeyHeyHeyHeyHe
                        yHeyHeyHeyHeyHeyHeyHeyHeyHeyHeyHeyHeyHeyHeyHeyHe
                        yHeyHeyHeyHeyHeyHeyHeyHeyHeyHeyHeyHeyHeyHeyHeyHe
                        yHeyHeyHeyHeyHeyHeyHeyHeyHeyHeyHeyHeyHeyHeyHeyHey
                        HeyHeyHeyHeyHeyHeyHeyHeyHeyHeyHeyHeyHeyHeyHeyHeyH
                        eyHeyHeyHeyHeyHeyHeyHeyHeyHeyHeyHeyHeyHeyHeyHeyHe
                        yHeyHeyHeyHeyHeyHeyHeyHeyHeyHeyHeyHeyHeyHeyHeyHey
                        HeyHeyHeyHeyHeyHeyHeyHeyHeyHeyHeyHeyHeyHeyHeyHeyH
                        eyHeyHeyHeyHeyHeyHeyHeyHeyHeyHeyHeyHeyHeyHeyHeyHe
                        yHeyHeyHeyHeyHeyHeyHeyHeyHeyHeyHeyHeyHeyHeyHeyHe
                        yHeyHeyHeyHeyHeyHeyHeyHeyHeyHeyHeyHeyHeyHeyHeyHey
                        HeyHeyHeyHeyHeyHeyHeyHeyHeyHeyHeyHeyHeyHeyHeyHeyH
                        eyHeyHeyHeyHeyHeyHeyHeyHeyHeyHeyHeyHeyHeyHeyHeyH
                        eyHeyHeyHeyHeyHeyHeyHeyHeyHeyHeyHeyHeyHeyHeyHeyHey
                        HeyHeyHeyHeyHeyHeyHeyHeyHeyHeyHeyHeyHeyHeyHeyHey
                        HeyHeyHeyHeyHeyHeyHeyHeyHeyHeyHeyHeyHeyHeyHeyHeyH
                        eyHeyHeyHeyHeyHeyHeyHeyHeyHeyHeyHeyHeyHeyHeyHeyHe
                        yHeyHeyHeyHeyHeyHeyHeyHeyHeyHeyHeyHeyHeyHeyHeyHey
                        HeyHeyHeyHeyHeyHeyHeyHeyHeyHeyHeyHeyHeyHeyHeyHeyH
                        eyHeyHeyHeyHeyHeyHeyHeyHeyHeyHeyHeyHeyHeyHeyHeyHe
                    </div>
   
                </div>
                <div className={styles.rightPane}>
                    <VisualNN/>
                </div>
            </div>
        )
    }

}

export default Layout;