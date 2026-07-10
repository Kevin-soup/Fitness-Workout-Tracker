import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import HomePage from "./pages/HomePage";
import EditExercisePage from "./pages/EditExercisePage";
import AddExercisePage from "./pages/AddExercisePage";
import { useState } from "react";

/**
 *  Sets up a single page application using React.
 */
function App() {
  const [exerciseToEdit, setExerciseToEdit] = useState([]);

  return (
    <>
      {/* App header. */}
      <header>
        <h1>Exercise Tracker</h1>
        <p>Full Stack MERN App Demonstration</p>
      </header>
      
      {/* Available page routes. */}
      <div className = "app-header">
        <Router>
            <Navigation />
            <Routes>
              <Route path="/" element={<HomePage 
                setExerciseToEdit={setExerciseToEdit}/>}></Route>

              <Route path="/edit" element={<EditExercisePage 
                exerciseToEdit={exerciseToEdit} />}></Route>

              <Route path="/create" element={<AddExercisePage />}></Route>
            </Routes>
        </Router>
      </div>

      {/* App footer. */}
      <footer>
        <p>&copy; 2025 Kevin Lin</p>        
      </footer>
    </>
  )
}

export default App
