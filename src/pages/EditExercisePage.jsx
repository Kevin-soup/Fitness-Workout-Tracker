import { useState } from "react";
import { useNavigate } from "react-router-dom";

/**
 *  Page to edit an existing exercise in the database.
 *  Allow users to modify infomation of exercises when a button is pressed.
 * 
 *  @param {object} exerciseToEdit 
 *  @returns Input fields for user information.
 */

function EditExercisePage({exerciseToEdit}){

    const [name, setName] = useState(exerciseToEdit.name);
    const [reps, setReps] = useState(exerciseToEdit.reps);
    const [weight, setWeight] = useState(exerciseToEdit.weight);
    const [unit, setUnit] = useState(exerciseToEdit.unit);
    const [date, setDate] = useState(exerciseToEdit.date);

    const navigate = useNavigate();

    // Update information of an existing exercise to database.
    const updateExercise = async () => {
        const editedExercise = {name, reps, weight, unit, date};

        // Call PUT endpoint "/exercises/:_id" in the REST API.
        const response = await fetch(`/exercises/${exerciseToEdit._id}`, {
            method: "PUT",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(editedExercise)
        });

        // Show an alert based on response status.
        if(response.status === 200){
            alert("Successfully updated the exercise!");
        } else {
            alert("Edit failed, double check your data.");
        }
        // Automatically navigate back to home page.
        navigate("/");
    };

    return (
        <div>
            <h2>Edit Exercise</h2>
            <div>         
                {/* Name text input. */}
                <input
                    type="text"
                    value={name}
                    required          
                    onChange={e => setName(e.target.value)} />

                {/* Reps number input. */}
                <input
                    type="number"
                    value={reps}
                    required               
                    onChange={e => setReps(e.target.valueAsNumber)} />

                {/* Weight number input. */}
                <input
                    type="number"
                    value={weight}
                    required               
                    onChange={e => setWeight(e.target.valueAsNumber)} />

                {/* Unit select element. */}
                <select
                    name="units"
                    value={unit}
                    required
                    onChange={e => setUnit(e.target.value)} >
                    <option value=""disabled> Select Unit </option>                        
                    <option value="lbs"> lbs </option>
                    <option value="kgs"> kgs </option>
                </select>                        

                {/* Date text input. */}
                <input
                    type="text"
                    value={date}
                    required
                    onChange={e => setDate(e.target.value)} />

                <button onClick={updateExercise}>Edit </button>
            </div>   
        </div>
    );
}

export default EditExercisePage