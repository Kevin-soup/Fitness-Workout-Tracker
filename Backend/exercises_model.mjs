/**
 *  Kevin Lin
 */
import mongoose from 'mongoose';
import 'dotenv/config';

const EXERCISE_DB_NAME = 'exercise_db';

let connection = undefined;

/**
 *  Connect to MongoDB server.
 *  Specifically to the database 'exercise_db' within in that server.
 */
async function connect(){
    try{
        connection = await mongoose.connect(process.env.MONGODB_CONNECT_STRING, 
                {dbName: EXERCISE_DB_NAME});
        console.log("Successfully connected to MongoDB using Mongoose!");
    } catch(err){
        console.log(err);
        throw Error(`Could not connect to MongoDB ${err.message}`)
    }
}


/**
 *  Set up for database schema and model.
 */
const exerciseSchema = mongoose.Schema({
    name: {type: String, required: true},
    reps: {type: Number, required: true},
    weight: {type: Number, required: true},
    unit: {type: String, required: true},
    date: {type: String, required: true},    
    }, {versionKey: false});
const Exercise = mongoose.model(EXERCISE_DB_NAME, exerciseSchema);


/**
 *  Creates an exercise in the database.
 * 
 *  @param {String} name
 *  @param {Number} reps 
 *  @param {Number} weight
 *  @param {String} unit
 *  @param {String} date
 *  @returns Promise of a document with new exercise. 
 */
const createExercise = async (name, reps, weight, unit, date) => {

    // Call constructor to create an instance of the model class Exercise.
    const newExercise = new Exercise({name: name, reps: reps, weight: weight, unit: unit, date: date});

    // Call save to persist this object as a document in MongoDB.
    return newExercise.save();
}


/**
 *  Retrieves all exercises in database.
 * 
 *  @returns Promise of all exercise information including mangoDB ID.
 */
const returnExercises = async () => {
    const allExercises = Exercise.find({});
    return allExercises.exec();
}


/**
 *  Search for a specific exercises in database by unique ID.
 * 
 *  @returns Promise of one document object from database (if found).
 */
const exerciseByID = async (exerciseID) => {
    const specificExercise = Exercise.findById(exerciseID);
    return specificExercise.exec();
}


/**
 *  Updates information of specified exercise in database.
 * 
 *  @returns Promise of one exercise document (updated).
 */
const updateByID = async (filter, update) => {
    const updatedExercise = Exercise.findOneAndUpdate(filter, update, {new: true});
    return updatedExercise.exec();
}


/**
 *  Removes an exercise document from the database.
 * 
 */
const deleteExercise = async (filter) => {
    Exercise.deleteOne(filter).exec();
}

export {connect, createExercise, returnExercises, exerciseByID, updateByID, deleteExercise};