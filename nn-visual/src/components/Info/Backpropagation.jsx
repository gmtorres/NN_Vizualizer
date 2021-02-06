import React from 'react';
import Expression from '../Expression/Expression';

const Backpropagation = () => {
    let example_expression = String.raw`f(x) = x^2`;
    let example_deriv_expression = String.raw`f'(x) = 2x`;
    let basic_gradient_expression = String.raw`x^{t+1} =  x^t - f'(x)`;
    let gradient_expression = String.raw`x_j^{t+1} =  x_j^t - \alpha \frac{\partial f}{\partial x_j}`;
    let error_expression = String.raw`Error = \frac 1 2 \sum_{i=1} (out_i^{last} - actual_i)^2`;
    let weight_expression = String.raw`w_{k,i}^{t+1} =  w_{k,i}^t - \alpha \frac{\partial E}{\partial w_{k,i}}`;
    let error_weight_expression = String.raw`\frac{\partial E}{\partial w_{k,n}} = \frac{\partial E}{\partial out_n^{last}} \times \frac{\partial out_n^{last}}{\partial in_n^{last}} \times \frac{\partial in_n^{last}}{\partial w_{k,n}}`;
    
    let error_node_expression_1 = String.raw`\frac{\partial E}{\partial out_n^{last}} = \frac {\partial \frac 1 2 \sum_{n=1} (out_n^{last} - actual_n)^2} {\partial out_n^{last}}`
    let error_node_expression_2 = String.raw`= 2 \times \frac 1 2 \times (out_n^{last} - actual_n)^{2-1} \times - 1`
    let error_node_expression_3 = String.raw`= actual_n-out_n^{last}`

    let activation_deriv_expression_1 = String.raw`\frac{\partial out_n^{last}}{\partial in_n^{last}} = \frac{\partial activation(in_n^{last})}{\partial in_n^{last}} = activation'(in_n^{last})`
    
    let weight_in_expression_1 = String.raw`\frac{\partial in_n^{last}}{\partial w_{k,n}} = \frac{\partial \sum_{k=1} out_k^{last-1} \times w_{k,n}}{\partial w_{k,n}}`
    let weight_in_expression_2 = String.raw`= out_k^{last-1}`

    let node_delta_expression_2 = String.raw` \Delta node_n^{last} = \frac{\partial E}{\partial out_n^{last}} \times \frac{\partial out_n^{last}}{\partial in_n^{last}} = \frac{\partial E}{\partial in_n^{last}}`
    
    let error_weight_expression_2 = String.raw`\frac{\partial E}{\partial w_{k,n}} = \frac{\partial E}{\partial out_n^l} \times \frac{\partial out_n^l}{\partial in_n^l} \times \frac{\partial in_n^l}{\partial w_{k,n}}`;

    //let error_weight_expression_2 = String.raw`\frac{\partial E}{\partial w_{k,n}} = \frac{\partial E}{\partial out_n} \times \frac{\partial out_n}{\partial in_n} \times \frac{\partial in_n}{\partial w_{k,n}}`;

    let error_hidden_node_expression_1 = String.raw`\frac{\partial E}{\partial out_n^l} = \sum_{k=1} { \left( \frac{\partial E}{\partial in_k^{l+1}} \frac{\partial in_k^{l+1}}{\partial out_n^l} \right) } `

    let weight_deriv = String.raw`\frac{\partial in_k^{l+1}}{\partial out_n^l} = w_{n,k}`
 
    let error_hidden_node_expression_2 = String.raw`\frac{\partial E}{\partial out_n^l} = \sum_{k=1} { \left( \Delta node_k^{l+1} \times w_{n,k} \right) }`

    let final_expression_1 = String.raw` \Delta node_n^{last} = (actual_n-out_n^{last}) \times activation'(node_n^{last})`
    let final_expression_2 = String.raw` \Delta node_n^{l} = \sum_{k=1} { \left( \Delta node_k^{l+1} \times w_{n,k} \right) } \times activation'(node_n^l)`
    let final_expression_3 = String.raw` \Delta w_{n,k} = \Delta node_n^{l} \times out_n^{l-1}`
    let final_expression_4 = String.raw` w_{n,k}^{t+1} = w_{n,k}^{t} \times \alpha \space \Delta w_{n,k}`

    return (
        <div>
            <h3>Backpropagation </h3>
            <p>
                <b>Backpropagation</b> is one of the most important things in Neural Networks, it is the method that allows our model to <b>train</b>
                and fit to the data we feed. Our goal is to <b>change each weight</b> in the network, so that the predictions of the network match
                the real outputs. The trick here is to apply an <b>iterative process</b> that will try, step by step, <b>minize the error</b> of the model. Before diving
                into the process itself we need to understand some things.
                <h4>Gradient descent</h4>
                <b>Gradient descent</b> is one of the key methods of backpropagation, it is an iterative optimization algorithm, where we try to find
                the <b>minimum</b> of a function. The principle here is to try to give successive <b>descendent steps</b>, from a starting point,
                until we can get the minimum point. But how do we do this?
                <br/>
                Lets take this function:
                <Expression expressions={example_expression} height={true}/>
                <img src={process.env.PUBLIC_URL + "/imgs/x^2.png"} alt="y=x^2" width='40%' style={{margin:'auto',display:'block'}}/>
                We can see that our minimum point is at x = 0, which is also the global minimum, the lower point across all function.
                But how do he get there starting from somewhere? We can imagine a <b>ball rolling down the hill</b>, and we take a step into that
                direction, so depending on the <b>slope</b> of the fuction we make our move to the next point, and we repeat the process.
                In this example, for values of x less than 0 we go right, for values of x greater than 0 we go left. This notion of slopes
                takes us to the <b>derivative</b> of the function:
                <Expression expressions={example_deriv_expression} height={true}/>
                <img src={process.env.PUBLIC_URL + "/imgs/2x.png"} alt="y=2x" width='40%' style={{margin:'auto',display:'block'}}/>
                As we can see, the derivative gives us the slope in the ascendent direction, however, if we take a step in the opposite
                direction we will <b>drive closer</b> to a minimum or an approximation of it. Note that this only works in convex functions.
                <Expression expressions={basic_gradient_expression} height={true}/>
                But we are not done yet, sometimes we can take a step in one direction and we when end up further away from the minimum than
                initialy, so we define a step size, with which we multiply our jump. But how big enough should the step size be? We cannot
                know exatcly how big it should be but we make a guess, given it is smaller than the optimal one, to avoid moving away from
                the minimum. This is a defined parameter, known as the <b>learning rate</b>.
                <br/>
                Furthermore, we can apply this principal to each of the dimension of the function, for every variable. If we have a function
                which takes more then one variable, we can apply this method to each one of the variables.
                This gives us the following update expression, for each variable in <i>f</i>: 
                <Expression expressions={gradient_expression} height={true}/>
                For those not familiar with that expression, it means the <b>partial derivative</b> of the function with respect to a variable, in other
                words, how much the function changes in terms of that specific variable.
                <br/>
                By an iterative approach, repeting this process, we can sucessfully get to a set variable that is more and more close to a 
                local minimum.
                <h4>Backpropagation</h4>
                Now we are ready to know how <b>Backpropagation</b> works!
                <br/>
                For backpropagation we are going to use <b>gradient descent</b>, but what function are we trying to find the minimum of? Well, we are going
                to <b>minize the error</b> between the prediction and the actual output. And the set of variables we are updating are the <b>set of weights</b> of
                our network model, in order to have the lowest error. For convinience we define the error function as follows:
                <Expression expressions={error_expression} height={true}/>
                This function is convex and allows us to differentiate so that the constants cancel out, that's why it turns out useful to define
                the error function this way.
                <br/>
                We will consider two cases, the base case being the <b>output layer</b>, and the second case being the <b>remaining layers</b>.
                As we seen before, we want to update our weights following this expression:
                <Expression expressions={weight_expression} height={true}/>
                But how do we calculate that gradient? We cannot directly calculate that value, but there is a way. As we seen in the previous section,
                our model can be seen as composite function and  our error function is just being applyed to the results of our model,
                making it also a composite function as well. So we can the <b>chain rule</b>, which allows us to decompose a derivative into several simpler, computable, derivatives.
                <br/>
                <h5>Output Layer</h5>
                So, let's start by the <b>first layer</b> (output layer), and then propagate this calculation <b>backwards</b>. For the first layer we can get
                the follows: 
                <Expression expressions={error_weight_expression} height={true}/>
                We can calculte each of this subexpressions, so we are going to walk through one by one.
                <br/>
                The first part means how much the error changes in terms of the <b><i>out value</i></b>  in each node.
                <Expression expressions={[error_node_expression_1,error_node_expression_2,error_node_expression_3]} height={true}/>
                The second part means how much the <b><i>out value</i></b> changes in terms of the <b><i>in value</i></b>. We know that the out value is calculated by
                applying the <b>activation function</b>, so we can use the <b>derivative of the activation function</b>.
                <Expression expressions={activation_deriv_expression_1} height={true}/>
                The third part is how much the <b><i>in value</i></b> changes in terms of the correspondent <b>weight</b>. We know how the in value is calculated,
                the first part of the feedfoward, so we can calculate this gradient:
                <Expression expressions={[weight_in_expression_1,weight_in_expression_2]} height={true}/>
                One thing we can notice is that for every edge that goes to the same node <i>n</i>, the <b>only</b> thing that changes is the <b>last term</b>,
                which turns out to depend on the origin node. This value can, then, be saved to be used for updating each weight that goes
                to node <i>n</i>, we call this the <b>node delta</b>:
                <Expression expressions={node_delta_expression_2} height={true}/>
                
                <h5>Hidden layers</h5>
                For the <b>hidden layers</b>, we go from the last layer and work our way to the first and apply a similar process.
                We want to know how much a weight influences the total error, but this time,
                a weight in the <b>hidden layers</b>, will have influence not only in one output values but <b>every output layer node</b>.
                <Expression expressions={error_weight_expression_2} height={true}/>
                The first part here is different here because we must take into account the <b>contribution</b> of the hidden node to every node in the
                <b> next layer</b>. So, we must sum the contributions to the error on the nodes in ht next layer. We get the following expression :
                <Expression expressions={error_hidden_node_expression_1} height={true}/>
                As we can see, each term of the sumation sequence will be composed of two parts, the first one, we have calculated before and saved that value,
                this is the <b>node delta</b> of the <b>next layer</b>, and second expression is how much the <b><i>in value</i></b> of some node <i>k</i>
                changes with respect to the <b><i>out value</i></b> the previous layer, which can be defined as follows:
                <Expression expressions={weight_deriv} height={true}/>
                We can see that this works because the <b><i>in value</i></b> of a node only uses the <b><i>out value</i></b> of node <i>n</i> multiplying by the weight of the connection.
                <br/>
                So, putting this all together, our final expression for how much the error changes in terms of the out value of a <b>hidden node </b>
                is the follwing:
                <Expression expressions={error_hidden_node_expression_2} height={true}/>
                The remaing expressions are deducted the <b>same way</b> as the output layer, so they stay the same, and the node delta can be calculated with this newly 
                expression.
                <h5>Wrapping it all together</h5>
                <Expression expressions={[final_expression_1,final_expression_2,final_expression_3,final_expression_4]} height={true}/>
                <br/>
                <br/>
            </p>

            
        </div>
    );
}

export default Backpropagation;