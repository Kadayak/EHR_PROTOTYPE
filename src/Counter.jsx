import React from 'react';

const Counter = () => {
    const [count, setCount] = React.useState(0);
     return(
        <React.Fragment>
            <h1>The count is: {count}</h1>
            <button onClick = {() => setCount(count + 1)}>Increment</button>
            <button onClick = {() => setCount(count - 1)}>Decrement</button>
        </React.Fragment>
     )
};

export default Counter;