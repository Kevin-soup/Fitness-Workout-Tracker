import { MdDeleteForever, MdModeEditOutline } from "react-icons/md";
import { useNavigate } from "react-router-dom";


/**
 *  This component organizes information for each exercise into individual table rows.
 * 
 *  @param {object} exercises 
 *  @param {function} DeleteExercise 
 *  @param {object} setExerciseToEdit 
 *  @returns Table rows with exercise data.
 */
function ExerciseItem({exercise, DeleteExercise, setExerciseToEdit}) {

    // Function sets an exercise to be edited.
    const navigate = useNavigate();
    const editButtonHandler = (exercise)=> {

        // Updates exercise variable of exerciseToEdit.
        const editedExerciseCopy = exercise
        setExerciseToEdit(editedExerciseCopy);

        // Automatically navigate to EditExercisePage.
        navigate("/edit"); 
    }


    return(
        <tr>
            <td>{exercise.name}</td>
            <td>{exercise.reps}</td>
            <td>{exercise.weight}</td>
            <td>{exercise.unit}</td>
            <td>{exercise.date}</td>

            {/* Displays an icon that calls DeleteExercise function from HomePage. */}           
            <td>
                <MdDeleteForever onClick={e => {e.preventDefault(); DeleteExercise(exercise._id)}} />
            </td>

            {/* Displays an icon that navigates to EditExercisePage. */}
            <td>            
                <MdModeEditOutline onClick={e => {e.preventDefault(); editButtonHandler(exercise)}} />
            </td>                
        </tr>
    )
}

export default ExerciseItem;