const Muscle = require('../models/muscle').Muscle;
const Q = require('q');

exports.index = function(req, res) {
    Muscle.find({}, function(err, muscles) {
        if(!err) {
            return res.status(200).json({muscles});
        } else {
            return res.status(500).json({err: err});
        }
    });
};

exports.show = function(req, res) {
    const id = req.params.id;
    Muscle.findById(id, function(err, muscle) {
        if(!err && muscle) {
            return res.status(200).json({muscle: muscle});
        } else if(err) {
            return res.status(500).json({error: "Unable loading muscle." + err});
        } else {
            return res.status(404).json({error: "Muscle not found."});
        }
    });
}

exports.create = function(req, res) {
    try {
        const muscle = new Muscle();
        muscle.name = req.body.name;
        muscle.imageURL = req.body.imageURL;
        muscle.exercises = req.body.exercises;
        muscle.save();
        return res.status(200).json({muscle: muscle});
    } catch (error) {
        return res.status(500).json({message: "Unable to create muscle"});
    }
};

exports.deleteExercise = function(req,res) {
    const name = req.body.exerciseName;
    Muscle.find({}, function(err, muscles) {
        if(!err) {
            for(var i = 0; i < muscles.length; i++) {
                for(var j = 0; j < muscles[i].exercises.length; j++) {
                    if(muscles[i].exercises[j].name === name) {
                        var exercises = muscles[i].exercises;
                        exercises.splice(j,1);
                        muscles[i].exercises = exercises;
                        muscles[i].save();
                        return res.status(200).json({"message": "OK"});
                    }
                }
            }
            return res.status(404).json({err: "Exercise not found"});
        } else {
            return res.status(500).json({err: err});
        }
    });
}

exports.addExercise = function(req, res) {

    const name = req.body.muscleName;
    const exerciseName = req.body.exerciseName;
    const videoURL = req.body.videoURL;
    const imageURL = req.body.imageURL;
    const description = req.body.description;
    const descriptionArray = description.toString().split('<->');
    Muscle.find({}, function(err, muscles) {
        if(!err) {
            for(var i = 0; i < muscles.length; i++) {
                if(muscles[i].name === name) {
                    var exercises = muscles[i].exercises;
                    exercises.push(
                        {
                            "name": exerciseName,
                            "videoURL": videoURL,
                            "imageURL": imageURL,
                            "description": descriptionArray,
                            "favourite": false,
                            "default": false
                        }
                    );
                    muscles[i].exercises = exercises;
                    muscles[i].save();
                    return res.status(200).json({muscles: muscles[i]});
                }
            }
            return res.status(404).json({err: "Muscle not found"});
        } else {
            return res.status(500).json({err: err});
        }
    });
};

exports.markAsFavourite = function(req, res) {

    const name = req.body.exerciseName;
    Muscle.find({}, function(err, muscles) {
        if(!err) {
            for(var i = 0; i < muscles.length; i++) {
                for(var j = 0; j < muscles[i].exercises.length; j++) {
                    if(muscles[i].exercises[j].name === name) {
                        var exercise = muscles[i].exercises[j];
                        if(muscles[i].exercises[j].favourite === true) {
                            exercise.favourite = false;
                        } else {
                            exercise.favourite = true;
                        }
                        muscles[i].exercises.set(j, exercise);
                        muscles[i].save();
                        return res.status(200).json({exercise: muscles[i].exercises[j]});
                    }
                }
            }
            return res.status(404).json({err: "Exercise not found"});
        } else {
            return res.status(500).json({err: err});
        }
    });
};

exports.destroy = function(req, res) {

    const id = req.params.id;
    Muscle.findById(id, function(err, doc) {
        if (!err && doc) {
            doc.remove();
            return res.status(200).json({message: "Muscle removed."});
        } else if (!err) {
            return res.status(404).json({message: "Could not find muscle."});
        } else {
            return res.status(403).json({message: "Could not delete muscle."});
        }
    });
};

exports.deleteAllMuscles = function(req, res) {
    Muscle.remove({}, function(err) {
        if (err) {
            return res.status(500).json({err: err});
        } else {
            return res.status(200).json({message: "all muscles removed"});
        }
    });
};