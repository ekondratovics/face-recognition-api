let express = require('express');
let bcrypt = require('bcrypt-nodejs');
let cors = require('cors');
let knex = require('knex');

let register = require('./controllers/register');
let signin = require('./controllers/signin');
let profile = require('./controllers/profile');
let image = require('./controllers/image');

process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;

let db = knex({
  client: 'pg',
  connection: {
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false
    }
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