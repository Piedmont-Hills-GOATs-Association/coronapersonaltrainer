const app = require('express')();
const mongoose = require('mongoose');

const PORT = 3000;

mongoose.connect('mongodb+srv://full_data_access:mw9coLioaTMF9PL3@cpt-cluster-1-phfvm.gcp.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true });
mongoose.connection.on('error', console.error.bind(console, 'connection error:'));

app.post('/', function (req, res) {

});

mongoose.connection.once('open', function() {
  console.log('Successful connection to MongoDB Atlas database.');
  app.listen(PORT, function () {
      console.log(`Server-side listening on port ${PORT}`);
  });
});
