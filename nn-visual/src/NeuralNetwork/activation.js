let activation = {
    linear : {
        func : (val) => val,
        deriv : (val) => 1
    },
    sigm : {
        func : (val) => 1 / (1 + Math.exp(-val)),
        deriv : (val) => val * (1-val)
    },
    relu : {
        func : (val) => val > 0 ? val : 0,
        deriv : (val) => val > 0 ? 1 : 0
    },
    relu2 : {
        func : (val) => val > 0 ? val : 0.1*val,
        deriv : (val) => val > 0 ? 1 : 0.1
    }
}

export default activation