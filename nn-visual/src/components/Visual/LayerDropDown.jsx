import React , { useState } from 'react';

import styles from './VisualNN.module.css'

const LayerDropDown  = (props) => {

    const [open, setOpen] = useState(false);

    const options = props.opts

    const width = 50;

    let entries = options.map((opt,i) => {
        //let color = opt === props.current.name ? "#c5d3ee" : "rgb(255,255,255)"
        let className = styles.activation_opt + " "
        className += opt === props.current.name ? styles.opt_active : ""
        return (
            <g key={"drop_opt_"+i}>
                <rect className={className} x={props.x - width/2} y={props.y+props.r/2 + 15 * i} width={width} height="15"
                    style={{stroke:"rgb(0, 0, 0)"}}/>
                <text x={props.x + 2 - width/2} y={props.y+props.r/2 + 15 * (i+1) - 2} fontSize="smaller">{opt}</text>
                <rect  x={props.x - width/2} y={props.y+props.r/2 + 15 * i} width={width} height="15"
                    style={{fill:"transparent"}}
                    onClick={() => {props.func(opt);setOpen(false)}}/>
            </g>
        )
    })

    let display = open ? "block" : "none"
    
    return (
        <g>
            <rect  x={props.x - width/2} y={props.y+props.r/2 - 15} width={width} height="15" style={{fill:"rgb(255,255,255)",stroke:"rgb(0, 0, 0)"}}/>
            <text x={props.x + 2 - width/2} y={props.y+props.r/2 - 2} fontSize="smaller">{props.current.name}</text>
            <text x={props.x + width - 13 - width/2} y={props.y+props.r/2 - 3} fontSize="x-small">▼</text>
            <rect  x={props.x - width/2} y={props.y+props.r/2 - 15} width={width} height="15" style={{fill:"transparent"}}
                onClick={() => setOpen(!open)}
            />
            <g display={display}>
                {entries}
            </g>
        </g>
    )
    
}

export default LayerDropDown;