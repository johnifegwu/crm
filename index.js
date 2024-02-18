import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import routes from './src/routes/crmRoutes';

const app = express();
const PORT = 3000;

//Mongoose connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/CRMdb');

//BodyParser setup
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

routes(app);

app.get('/', (req, res) =>
  res.send(`Node and Express server is running on port ${PORT}`)
);

app.listen(PORT, () =>
  console.log(`Your server is running on port number ${PORT}`)
);