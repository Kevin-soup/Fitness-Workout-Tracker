import ExerciseCollection from "../components/ExerciseCollection";
import { useState, useEffect } from "react";


/**
 *  Home page for this application.
 *
 *  @param {object} setExerciseToEdit 
 *  @returns Database information in a table.
 */
function HomePage({setExerciseToEdit}) {

    // Load exercises from database.
    const [exercises, setExercises] = useState([]);
    const loadExercises = async () => {

        // Call GET endpoint "/exercises" in the REST API.
        const response = await fetch("/exercises");

        // Parse response into Javascript object. 
        const data = await response.json();

        // Update "exercises" variable with data from database.
        setExercises(data);
    }
    // Run loadExercise only when components are first mounted. 
    useEffect(() => {
        loadExercises(); 
    }, []);


    // Function that deletes an exercise from both the user display and database.
    const DeleteExercise = async (_id) => {

        // Call DELETE endpoint "/exercises/:_id" in the REST API.
        const response = await fetch(`/exercises/${_id}`, { method: "DELETE" });

        if (response.status === 204) {
            // Call GET endpoint "/exercises" in the REST API.
            const newResponse = await fetch("/exercises");
            const data = await newResponse.json();

            // Update "exercises" variable with new data from database.
            setExercises(data);

        } else {
            console.error(`Error: Failed to delete exercise`)
        }
    }


    return (
        <div className="table_wrapper">
            {/* Pass database information and functions to child component. */}
            <ExerciseCollection exercises={exercises} DeleteExercise={DeleteExercise}
                setExerciseToEdit={setExerciseToEdit}> </ExerciseCollection>
        </div>

    )
}

export default HomePage;