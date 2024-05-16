// App.tsx
// This file defines the main App component, which acts as a container for other components.

import ToDoList from './components/ToDoList/ToDoList'; // Import the ToDoList component.
import './App.css'; // Import the CSS file for styling the App component.

// Define a functional component named App.
function App() {
  return (
    <div className="app-container"> {/* A container for centering the content. */}
      <ToDoList /> 
    </div>
  );
}

// Export the App component as the default export.
export default App;

