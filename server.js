let express = require('express');
let bcrypt = require('bcrypt-nodejs');
let cors = require('cors');
let knex = require('knex');

let register = require('./controllers/register');
let signin = require('./controllers/signin');
let profile = require('./controllers/profile');
let image = require('./controllers/image');

let db = knex({
  client: 'pg',
  connection: {
    host: 'postgresql-adjacent-61518',
    user: 'postgres',
    password: 'sev17wHSp',
    database: 'face_recognition'
  }
});

let app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => { res.send('Success.') });

app.post('/signin', (req, res) => { signin.handleSignIn(req, res, db, bcrypt) });

app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) });

app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, db) });

app.put('/image', (req, res) => { image.handleImagePut(req, res, db) });

app.post('/imageurl', (req, res) => { image.handleApiCall(req, res) });

app.listen(process.env.PORT || 3000, () => {
  console.log(`App is running on port ${process.env.PORT}.`);
});