import React, { useContext } from 'react';
import { ThemeProvider, ThemeContext } from './context/ThemeContext';
import Counter from './components/Counter';
import InputFocus from './components/InputFocus';

const App = () => {
  const { isDarkTheme, toggleTheme } = useContext(ThemeContext);
  
  // Alert when `useContext` hook is used
 // alert("useContext Hook Triggered");

  return (
    <div style={{ backgroundColor: isDarkTheme ? '#333' : '#fff', color: isDarkTheme ? '#fff' : '#000', padding: '20px' }}>
      <h1>React Hooks Example</h1>
      <button onClick={toggleTheme}>
        Toggle to {isDarkTheme ? 'Light' : 'Dark'} Theme
      </button>
      <Counter />
      <InputFocus />
    </div>
  );
};

const Root = () => (
  <ThemeProvider>
    <App />
  </ThemeProvider>
);

export default Root;
