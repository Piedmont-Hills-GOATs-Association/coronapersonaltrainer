const app = require('express')();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const admin = require('firebase-admin');
const { Users } = require('./models.js')

const PORT = 3030;

mongoose.connect('mongodb+srv://full_data_access:mw9coLioaTMF9PL3@cpt-cluster-1-phfvm.gcp.mongodb.net/CPT-Data?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.on('error', console.error.bind(console, 'connection error:'));

//Firebase Admin Private Key
const serviceAccount = require("./corona-personal-trainer-firebase-adminsdk-kpc7e-52d8d13b29.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://corona-personal-trainer.firebaseio.com"
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Token");
  res.header("Access-Control-Allow-Methods", "POST, PUT, GET, OPTIONS");
  next();
});

const checkToken = async (req, res) => {
  if (req.header('Token')) {
    if (req.header('Token') === 'API-test') {
      if (req.body.email) {
        return {
          email: req.body.email
        };
      } else {
        return {
          email: req.query.email
        };
      }
    } else {
      try {
        const decodedToken = await admin.auth().verifyIdToken(req.header('Token'));
        return await admin.auth().getUser(decodedToken.uid);
      } catch (e) {
        console.log(e);
        return false;
      }
    }
  } else {
    return false;
  }
};

const updateUser = async (email, req) => {
  const user = {};
  if (req.body.username) user.username = req.body.username;
  if (req.body.height) user.height = req.body.height;
  if (req.body.weight) user.weight = req.body.weight;
  try {
    await Users.updateOne({
      email
    }, user);
    console.log(`Successful user update: ${req.body.email}`);
    console.log(user);
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
};

app.route('/user')
  .get(async (req, res) => {
    const user = await checkToken(req, res);
    if (user) {
      if (req.query.action) {
        switch (req.query.action) {
          case 'data':
            const mdbUser = await Users.findOne({
              email: user.email
            });
            console.log(mdbUser)
            console.log(`Found user data: ${mdbUser}`);
            res.status(200).json(mdbUser);
            break;
          default:
            console.log(`Action ${req.query.action} does not exist - Email: ${user.email}`)
            res.status(500).send(`Action ${req.query.action} does not exist - Email: ${user.email}`);
            break;
        }
      } else {
        console.log(`No action parameter - Email: ${user.email}`)
        res.status(500).send(`No action parameter - Email: ${user.email}`);
      }
    } else {
      console.log(`Invalid API Token: ${req.header('Token')}`)
      res.status(500).send(`Invalid API Token: ${req.header('Token')}`);
    }
  }).post(async (req, res) => {
    const user = await checkToken(req, res);
    if (user) {
      if (req.body.username) {
        try {
          await Users.create({
            email: user.email,
            username: req.body.username
          });
          console.log(`Successful user created: ${req.body.email} - @${req.body.username}`);
          res.status(200).end();
        } catch (e) {
          console.log(e);
          res.status(500).send(e);
        }
      } else {
        console.log(`Not enough parameters - Email: ${user.email}`)
        res.status(500).send(`Not enough parameters - Email: ${user.email}`);
      }
    } else {
      console.log(`Invalid API Token: ${req.header('Token')}`)
      res.status(500).send(`Invalid API Token: ${req.header('Token')}`);
    }
  }).put(async (req, res) => {
    const user = await checkToken(req, res);
    if (user) {
      if (await updateUser(user.email, req)) {
        res.status(200).end();
      } else {
        res.status(500).send(e);
      }
    } else {
      console.log(`Invalid API Token: ${req.header('Token')}`)
      res.status(500).send(`Invalid API Token: ${req.header('Token')}`);
    }
  });

mongoose.connection.once('open', function() {
  console.log('Successful connection to MongoDB Atlas database.');
  app.listen(PORT, function () {
      console.log(`Server-side listening on port ${PORT}.`);
  });
});
