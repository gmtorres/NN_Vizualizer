import { MathComponent } from 'mathjax-react'

import React from 'react';

import './Expression.css'

const Expression = (props) => {
    const equations = Array.isArray(props.expressions) ? props.expressions : [props.expressions]
    if(equations === undefined) return null;
    const typesetEquations = equations.map((e, i) => <MathComponent tex={e} key={i} />);
    let className = props.height ? "" : "expression_wrapper"
    return (
        <div className={className}>
           {typesetEquations} 
        </div>
        
    );
}

export default Expression;