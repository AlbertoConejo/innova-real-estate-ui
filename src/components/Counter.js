import React, { useState, useEffect } from 'react';

const Counter = () => {
  const [count, setCount] = useState(0);

  // Alert when the `useState` hook is used
 //alert("useState Hook Triggered");

  useEffect(() => {
    alert("useEffect Hook Triggered"); // Alert on `useEffect` trigger
    console.log(`Count changed to ${count}`);
  }, [count]); // Runs whenever `count` changes

  return (
    <div>
      <h2>Counter: {count}</h2>
      <button onClick={() => setCount(count + 1)}>Increase</button>
      <button onClick={() => setCount(count - 1)}>Decrease</button>
    </div>
  );
};

export default Counter;
