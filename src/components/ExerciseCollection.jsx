import ExerciseItem from "./ExerciseItem";

/**
 *  This component displays the collection of database exercises in a table.
 * 
 *  @param {object} exercises 
 *  @param {function} DeleteExercise 
 *  @param {object} setExerciseToEdit 
 *  @returns Table header and body.
 */
function ExerciseCollection({exercises, DeleteExercise, setExerciseToEdit}) {
    return(
        <table>
            <thead>
            <tr>
                <th>Name</th>
                <th>Reps</th>                
                <th>Weight</th>
                <th>Unit</th>
                <th>Date</th>
                <th>Delete</th>
                <th>Edit</th>
            </tr>
            </thead>

            <tbody>
                {/* Iterate through array of database exercises and pass to ExerciseItem component. */}
                {exercises.map((exercise, index) => <ExerciseItem exercise={exercise} 
                    key={index} DeleteExercise={DeleteExercise} setExerciseToEdit={setExerciseToEdit} />)}
            </tbody>
        </table>
    )
}

export default ExerciseCollection;