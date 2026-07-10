import { useState } from "react";
import { useNavigate } from "react-router-dom";

/**
 *  Page to add new exercises to the database.
 *  Allow users to input information and create new exercises.
 * 
 *  @returns Input fields for user information.
 */
function AddExercisePage(){

    const [name, setName] = useState("");
    const [reps, setReps] = useState("");
    const [weight, setWeight] = useState("");
    const [unit, setUnit] = useState("lbs");
    const [date, setDate] = useState("");
    
    const navigate = useNavigate();

    // Send information about new exercise to database.
    const addExercise = async () => {
        const newExercise = {name, reps, weight, unit, date};

        // Call POST endpoint "/exercises" in the REST API.
        const response = await fetch("/exercises", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(newExercise)
        });

        // Show an alert based on response status.
        if(response.status === 201){
            alert("Successfully added the exercise!");
        } else {
            alert("Failed to add exercise, double check your data.");
        }
        // Automatically navigate back to home page.
        navigate("/");
    };

    return (
        <div>
            <h2>Add Exercise</h2>
            <div>
                {/* Name text input. */}
                <input
                    type="text"
                    placeholder="Exercise Name"
                    value={name}
                    required          
                    onChange={e => setName(e.target.value)} />

                {/* Reps number input. */}
                <input
                    type="number"
                    value={reps}
                    placeholder="Number of Reps"
                    required           
                    onChange={e => setReps(e.target.valueAsNumber)} />

                {/* Weight number input. */}
                <input
                    type="number"
                    value={weight}
                    placeholder="Equipment Weight"
                    required              
                    onChange={e => setWeight(e.target.valueAsNumber)} />

                {/* Unit select element. */}
                <select
                    name="units"
                    value={unit}
                    required
                    onChange={e => setUnit(e.target.value)} >
                    <option value="lbs"> lbs </option>
                    <option value="kgs"> kgs </option>
                </select>                        

                {/* Date text input. */}
                <input
                    type="text"
                    placeholder="Date: MM-DD-YY"
                    value={date}
                    required="required"
                    onChange={e => setDate(e.target.value)} />

                <button onClick={addExercise}>Add </button>
            </div>
        </div>
    );
}

export default AddExercisePage
