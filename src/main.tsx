// main.tsx
// This file is the entry point for your React application.

import React from 'react'; // Import the React library.
import ReactDOM from 'react-dom/client'; // Import the ReactDOM library to render the app.
import App from './App'; // Import the main App component.
import './index.css'; // Import the global CSS file for styling.

// Create a React root using the element with the id 'root' in your HTML.
ReactDOM.createRoot(document.getElementById('root')!).render(
  // Enable React's Strict Mode for additional checks and warnings.
  <React.StrictMode>
    <App /> {/* Render the main App component. */}
  </React.StrictMode>
);


