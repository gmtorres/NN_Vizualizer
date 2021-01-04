import React from 'react'
import { TopbarData } from './TopbarData'

import styles from './Topbar.module.css'

function Topbar(props){
    function handleClick(title,component) {
        const {onClick} = props;
        onClick(title,component);
    }

    return ( 
        <nav>
            <ul className={styles.Topbar}>
                {TopbarData.map((item, index) => {
                    let className = styles.TopbarItem;
                    if(props.current === item.title)
                        className += " " + styles.isActive;
                    else className += " " + styles.isNotActive;
                    return(
                        <li className={className} key={index} onClick={handleClick.bind(this,item.title,item.component)}>
                                <span>{item.title}</span>
                        </li>
                    )
                })}
            </ul>
        </nav>
    )
}
export default Topbar