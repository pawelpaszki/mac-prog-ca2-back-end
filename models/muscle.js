const mongoose = require('mongoose');
    Schema = mongoose.Schema;


const muscleSchema = new Schema({
    id  : Schema.Types.ObjectId,
    name: { type: String, unique: true },
    imageURL: { type: String, unique: true },
    exercises: [{}]

});

const muscle = mongoose.model('muscle', muscleSchema);

module.exports = {
    Muscle: muscle
};
