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
                Backpropagation is one of the most important things in Neural Networks, it is the method that allows our model to train
                and fit to the data we feed. Our goal is to change each weight in the network, so that the predictions of the network match
                the real outputs. The trick is an iterative process that will try, step by step, minize the error of the model. Before diving
                into the process itself we need to understand some things.
                <h4>Gradient descent</h4>
                Gradient descent is one of the key methods of backpropagation, it is an iterative optimization algorithm, where we try to find
                the minimum/maximum of a function. The principle here is to try to give successive descendent steps, from a starting point,
                until we can get the minimum point. But how do we do this?
                <br/>
                Lets take this function:
                <Expression expressions={example_expression} height={true}/>
                <img src={process.env.PUBLIC_URL + "/imgs/x^2.png"} alt="y=x^2" width='40%' style={{margin:'auto',display:'block'}}/>
                We can see that our minimum point is at x = 0, which is also the global minimum, the lower point across all function.
                But how do he get there starting from somewhere? We can imagine a ball rolling down the hill, and we take a step into that
                direction, so depending on the slope of the fuction we make our move to the next point. In this example, for values of x less
                than 0 we go right, for values of x greater than 0 we go left. This notion of slopes takes us to the derivative of the function:
                <Expression expressions={example_deriv_expression} height={true}/>
                <img src={process.env.PUBLIC_URL + "/imgs/2x.png"} alt="y=2x" width='40%' style={{margin:'auto',display:'block'}}/>
                As we can see, the derivative gives us the slope in the ascendent direction, however, if we take a step in the opposite
                direction we will drive to a minimum or an approximation of it. Note that this only works in convex functions.
                <Expression expressions={basic_gradient_expression} height={true}/>
                But we are not done yet, sometimes we can take a step in one direction and we when end up further away from the minimum than
                initialy, so we define a step size, with which we multiply our jump. But how big enough should the step size be? We cannot
                know exatcly how big it should be but we make a guess, given it is smaller than the optimal one, to avoid moving away from
                the minimum.
                <br/>
                Furthermore, we can apply this principal to each of the dimension of the function, for every variable. This gives us the
                following expression, for each variable in f: 
                <Expression expressions={gradient_expression} height={true}/>
                By an iterative approach, repeting this process, we can sucessfully get to a set variable that is more and more close to a 
                local minimum.
                <h4>Backpropagation</h4>
                Now we are ready to know how Backpropagation works!
                <br/>
                For backpropagation we are going to use gradient descent, but what function are we trying to find the minimum of? Well, we are going
                to minize the error between the prediction and teh actual output. And the set of variables we are updating are the set of weights of
                our network model, in order to have the lowest error. For convinience we define the error function as follows:
                <Expression expressions={error_expression} height={true}/>
                This function is convex and allows us to differentiate so that the constants cancel out, that's why it turns out useful to define
                the error function this way.
                <br/>
                We will consider two cases, the base case being the output layer, and the second case being the remaining layers.
                As we seen before, we want to update our weights following this expression:
                <Expression expressions={weight_expression} height={true}/>
                But how do we calculate that gradient? As we seen in the previous section, our model can be seen as composite function and 
                our error function is just being applyed to the results of our model, making it also a composite function as well. So we can 
                the chain rule, which allows us to decompose a derivative into several, computable, derivatives.
                <br/>
                <h5>Output Layer</h5>
                So, let's start by the end layer (output layer), and then propagate this calculation backwards. For the first layer we can get
                the follows: 
                <Expression expressions={error_weight_expression} height={true}/>
                We can calculte each of this subexpression, so we are going to walk through one by one.
                <br/>
                The first part means how much the error changes in terms of the out value in each node.
                <Expression expressions={[error_node_expression_1,error_node_expression_2,error_node_expression_3]} height={true}/>
                The second part means how much the out value changes in terms of the in value. We know that the out value is calculated by
                applying the activation function, so we can use the derivative of the activation function.
                <Expression expressions={activation_deriv_expression_1} height={true}/>
                The third part is how much the in value changes in terms of the correspondent weight. We know how the in value is calculated,
                the first part of the feedfoward, so we can calculate this gradient:
                <Expression expressions={[weight_in_expression_1,weight_in_expression_2]} height={true}/>
                One thing we can notice is that for every edge that goes to the same node n, the only thing that chages is the last term, which
                is the out value of that node. We can call this value, the node delta:
                <Expression expressions={node_delta_expression_2} height={true}/>
                
                <h5>Hidden layers</h5>
                For the hidden layers, he go from the last layer and work our way to the first and we apply a similar process.
                We want to know how much a weight influeces the total error, but this time,
                a weight in the hidden layers, will have influece not only in one output values but in every one.
                <Expression expressions={error_weight_expression_2} height={true}/>
                The first part here is different here because we must take into account the contribution of the hidden node to every node in the next
                layer. So we must sum the contributions to the error on the nodes in ht next layer. We get the following expression :
                <Expression expressions={error_hidden_node_expression_1} height={true}/>
                As we can see, each term of the sumation sequence will be composed of two parts, the first one, we have calculated before, the node delta 
                of the next layer, and second expression can be defined as follows:
                <Expression expressions={weight_deriv} height={true}/>
                This is true because the in value of a node is calculated using the in value of node n times the weight of the connection.
                <br/>
                So, putting this all together, our final expression for how much the error changes in terms of the out value of a hidden node
                is the follwing:
                <Expression expressions={error_hidden_node_expression_2} height={true}/>
                The remaing expressions are deducted the same way as the output layer, and the node delta can be calculated with this newly 
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