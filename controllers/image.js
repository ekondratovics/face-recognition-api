let clarifai = require('clarifai');

let app = new clarifai.App({
  apiKey: '35141063167a407bb0fd63bcb683e0a4'
});

let handleApiCall = (req, res) => {
  app.models
  .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
  .then(data => {
    res.json(data);
  })
  .catch(err => res.status(400).json('Unable to work with API'))
}

let handleImagePut = (req, res, db) => {
  let { id } = req.body;
  db('users').where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries  => res.json(entries[0]))
    .catch(err => res.status(400).json('Unable to get entries.'))
}

module.exports = {
  handleImagePut: handleImagePut,
  handleApiCall: handleApiCall
}