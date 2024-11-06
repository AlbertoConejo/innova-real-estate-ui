import React, { useRef } from 'react';

const InputFocus = () => {
  const inputRef = useRef();
  
  // Alert when the `useRef` hook is used
  alert("useRef Hook Triggered");

  const handleFocus = () => {
    inputRef.current.focus(); // Focuses the input element
  };

  return (
    <div>
      <input ref={inputRef} type="text" placeholder="Focus me with button" />
      <button onClick={handleFocus}>Focus Input</button>
    </div>
  );
};

export default InputFocus;
