const app = require('express')();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const multer = require('multer');
const gridfs = require('gridfs-stream');
const fs = require('fs');
const admin = require('firebase-admin');
const { Users } = require('./models.js');

const PORT = 3030;

mongoose.connect('mongodb+srv://full_data_access:mw9coLioaTMF9PL3@cpt-cluster-1-phfvm.gcp.mongodb.net/CPT-Data?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.on('error', console.error.bind(console, 'connection error:'));
gridfs.mongo = mongoose.mongo;

//Firebase Admin Private Key
const serviceAccount = require("./corona-personal-trainer-firebase-adminsdk-kpc7e-52d8d13b29.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://corona-personal-trainer.firebaseio.com"
});

mongoose.connection.once('open', function() {
  console.log('Successful connection to MongoDB Atlas database.');
  const gfs = gridfs(mongoose.connection.db);

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Token");
    res.header("Access-Control-Allow-Methods", "POST, PUT, GET, OPTIONS");
    next();
  });

  const checkToken = async (req, res) => {
    console.log(req.body)
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
    if (req.videos) user.videos = req.videos;
    try {
      await Users.updateOne({
        email
      }, user);
      console.log(`Successful user update: ${email}`);
      console.log(user);
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  };

  app.route('/user')
    .get(async (req, res) => {
      const fbuser = await checkToken(req, res);
      if (fbuser) {
        if (req.query.action) {
          switch (req.query.action) {
            case 'data':
              const mdbuser = await Users.findOne({
                email: fbuser.email
              });
              console.log(mdbuser)
              console.log(`Found user data: ${mdbuser}`);
              res.status(200).json(mdbuser);
              break;
            default:
              console.log(`Action ${req.query.action} does not exist - Email: ${fbuser.email}`)
              res.status(500).send(`Action ${req.query.action} does not exist - Email: ${fbuser.email}`);
              break;
          }
        } else {
          console.log(`No action parameter - Email: ${fbuser.email}`)
          res.status(500).send(`No action parameter - Email: ${fbuser.email}`);
        }
      } else {
        console.log(`Invalid API Token: ${req.header('Token')}`)
        res.status(500).send(`Invalid API Token: ${req.header('Token')}`);
      }
    }).post(async (req, res) => {
      const fbuser = await checkToken(req, res);
      if (fbuser) {
        if (req.body.username) {
          try {
            await Users.create({
              email: fbuser.email,
              username: req.body.username,
              height: '',
              weight: '',
              videos: []
            });
            console.log(`Successful user created: ${req.body.email} - @${req.body.username}`);
            res.status(200).end();
          } catch (e) {
            console.log(e);
            res.status(500).send(e);
          }
        } else {
          console.log(`Not enough parameters - Email: ${fbuser.email}`)
          res.status(500).send(`Not enough parameters - Email: ${fbuser.email}`);
        }
      } else {
        console.log(`Invalid API Token: ${req.header('Token')}`)
        res.status(500).send(`Invalid API Token: ${req.header('Token')}`);
      }
    }).put(async (req, res) => {
      const fbuser = await checkToken(req, res);
      if (fbuser) {
        if (await updateUser(fbuser.email, req)) {
          res.status(200).end();
        } else {
          res.status(500).send(e);
        }
      } else {
        console.log(`Invalid API Token: ${req.header('Token')}`)
        res.status(500).send(`Invalid API Token: ${req.header('Token')}`);
      }
    });

  app.post('/upload', async (req, res) => {
      multer({
          storage: multer.diskStorage({
            destination: './tmp'
          })
      }).any()(req, res, async (err) => {
        const fbuser = await checkToken(req, res);
        if (fbuser) {
          if (err) {
            console.log(err);
            res.status(500).send(`Error has occurred - Email: ${fbuser.email}`);
          } else {
            const mdbuser = await Users.findOne({
              email: fbuser.email
            });
            const file = req.files[0];
            let filename = `${req.body.videoName} (${mdbuser.username})`;
            let uploadInfo = await updateUser(fbuser.email, {
              body: {},
              videos: mdbuser.videos.concat({
                bmi: Math.floor(703 * mdbuser.weight / Math.pow(mdbuser.height, 2)),
                intensity: req.body.intensity,
                description: req.body.instructions,
                timestamp: Date.now(),
                filename
              })
            });
            if (uploadInfo) {
              const writestream = gfs.createWriteStream({ filename });
              fs.createReadStream(file.path).pipe(writestream);
              writestream.on('close', () => {
                fs.unlink(file.path, () => {
                  res.status(200).send(true);
                });
              });
            } else {
              console.log(err);
              res.status(500).send(`Error has occurred - Email: ${fbuser.email}`);
            }
          }
      } else {
        console.log(`Invalid API Token: ${req.header('Token')}`)
        res.status(500).send(`Invalid API Token: ${req.header('Token')}`);
      }
    });
  });


  app.listen(PORT, function () {
      console.log(`Server-side listening on port ${PORT}.`);
  });
});
