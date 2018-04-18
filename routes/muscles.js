muscles = require('../controllers/muscle');

module.exports = function(app){

  app.get('/api/muscles', muscles.index);
  app.get('/api/muscles/:id', muscles.show);
  app.post('/api/muscles', muscles.create);
  app.post('/api/muscles/exercises', muscles.addExercise);
  app.post('/api/muscles/deleteExercise', muscles.deleteExercise);
  app.put('/api/muscles', muscles.markAsFavourite);
  app.delete('/api/muscles/:id', muscles.destroy);
  app.delete('/api/deleteall', muscles.deleteAllMuscles);

};
