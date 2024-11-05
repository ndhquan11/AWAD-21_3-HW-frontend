import React from 'react';
import useStore from '../store/useStore';

const Counter = () => {
  const { count, increaseCount, decreaseCount } = useStore();

  return (
    <div>
      <h1>{count}</h1>
      <button onClick={increaseCount}>Increase</button>
      <button onClick={decreaseCount}>Decrease</button>
    </div>
  );
};

export default Counter;
