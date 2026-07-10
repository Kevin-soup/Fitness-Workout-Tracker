/**
 *  Kevin Lin
 */
import 'dotenv/config';
import express from 'express';
import asyncHandler from 'express-async-handler';
import * as exercises from './exercises_model.mjs';


const PORT = process.env.PORT;
const app = express();
const ERROR_INVALID_REQ = {Error: 'Invalid request'};
const ERROR_NOT_FOUND = {Error: "Not found"};

app.use(express.json());

app.listen(PORT, async () => {
    await exercises.connect()
    console.log(`Server listening on port ${PORT}...`);
});


/**
 *  Creates a new exercise using POST.
 *  
 *  Handles "POST" method for "/exercises" endpoint.
 * 
 *  Pulls information from query parameters in the body.
 */
app.post("/exercises", asyncHandler(async (req, res) => {

    // Validate information from the request body. 
    if(!isValid(req)){
        res.status(400).json(ERROR_INVALID_REQ);
    } else{

    // Send information to model. Create new exercise.
        const newExercise = await exercises.createExercise(
            req.body.name, 
            req.body.reps, 
            req.body.weight,
            req.body.unit,
            req.body.date,);

        res.status(201).json(newExercise);
    }
}));


/**
 *  READS all database exercises using GET.
 *  
 *  Handles "GET" method for "/exercises" endpoint.
 */
app.get("/exercises", asyncHandler(async (req, res) => {

    const entireCollection = await exercises.returnExercises()

    // Respond with a JSON array containing the enitre collection.
    res.status(200).json(entireCollection);
}));


/**
 *  RETRIEVE a specific document with database ID using GET.
 *  
 *  Handles "GET" method for "/exercises/:_id" endpoint.
 *  
 *  Pulls ID from path parameter.
 */
app.get("/exercises/:_id", asyncHandler(async (req, res) => {

    const findExercise = await exercises.exerciseByID(req.params._id);

    // Check if unique ID exist in database.
    if (findExercise === null){
        res.status(404).json(ERROR_NOT_FOUND);
    }

    // Repond with specified JSON object.
    res.status(200).json(findExercise);     
}));


/**
 *  EDIT a specific exercise document using PUT.
 *  
 *  Handles "PUT" method for "/exercises/:_id" endpoint.
 *  
 *  Pulls ID from path parameter and updates from request body.
 */
app.put("/exercises/:_id", asyncHandler(async (req, res) => {
    const findExercise = await exercises.exerciseByID(req.params._id);

    // Validate information from the request body. 
    if(!isValid(req)){
        res.status(400).json(ERROR_INVALID_REQ);
    
    // Check if unique ID exist in database.
    }else if (findExercise === null){
        res.status(404).json(ERROR_NOT_FOUND);

    } else{

    // Update exercise document and respond with it as a JSON object.
        const updatedExercise = await exercises.updateByID(findExercise, req.body);
        res.status(200).json(updatedExercise);   
    }    
}));


/**
 *  DELETE a exercise document using DELETE.
 *  
 *  Handles "DELETE" method for "/exercises/:_id" endpoint.
 *  
 *  Pulls ID from path parameter.
 */
app.delete("/exercises/:_id", asyncHandler(async (req, res) => {
    const findExercise = await exercises.exerciseByID(req.params._id);

    // Check if user ID exists in database.
    if (findExercise === null){
        res.status(404).json(ERROR_NOT_FOUND);

    } else{

        // Delete exercise and repsond with neither a content-type nor reponse body.
        await exercises.deleteExercise(findExercise);
        res.status(204).json();    
    }
}));


/**
 *  Validate properties in the request body (JSON object). 
 * 
 *  name = must be a string containing at least one character. 
 *  reps & weight = must be an integer greater than 0.
 *  unit = must be a string, either kgs or lbs.
 *  date = must be a string in the format MM-DD-YY.
 * 
 *  @param {object} req 
 *  @returns True if the request body has no issues. False otherwise.
 */
function isValid(req){
    const name = req.body.name;
    const reps = req.body.reps;
    const weight = req.body.weight;
    const unit = req.body.unit;
    const date = req.body.date;

    // Check if all five properties are present.
    if(name === undefined || reps === undefined || weight === undefined 
        || unit === undefined || date === undefined){
        return false;
    }

    // Validate name property.
    if(typeof name !== "string" || name.length < 1){
        return false;
    }

    // Validate reps and weight property.
    if(typeof reps !== "number" || reps <= 0 
        || typeof weight !== "number" || weight <= 0){
        return false;
    }
        
    // Validate unit property.
    if(unit !== "kgs" && unit !== "lbs" ){
        return false;
    }
        
    // Validate date property.
    if(!isDateValid(date)){
        return false;
    }

    // Request body is valid.
    return true;
}


/**
*   Validate date in MM-DD-YY format (2 digit integers).
*
*   @param {string} date
*   @returns True if the date format is correct. False otherwise.
*/
function isDateValid(date) {

    // Check for proper format.
    const format = /^\d\d-\d\d-\d\d$/;
    if(!format.test(date)){
        return false;
    };

    // Basic check for correct date.
    const [monthString, dayString, yearString] = date.split("-")
    const month = parseInt(monthString);
    const day = parseInt(dayString);
    const year = parseInt(yearString);

    if(month < 1 || month > 12){
        return false;
    }
    if(day < 1 || day > 31){
        return false;
    }
    if(year < 0){
        return false;
    }

    // Date is valid.
    return true;
}