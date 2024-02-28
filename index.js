import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import routes from './src/routes/crmRoutes';
import jwt from 'jsonwebtoken';

const app = express();
const PORT = 3000;

//Mongoose connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/CRMdb');

//BodyParser setup
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//JWT setup
app.use((req, res, next) => {
  if(req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT'){
    jwt.verify(req.headers.authorization.split(' ')[1], 'mysecretekey', (err, decode) =>{
      if(err) {
        req.user = undefined;
      }
      else{
        req.user = decode;
      }
       next();
    });
  }else{
     req.user = undefined;
     next();
  }
});

//for serving static files
app.use(express.static('./oublic'));

routes(app);

app.get('/', (req, res) =>
  res.send(`Node and Express server is running on port ${PORT}`)
);

app.listen(PORT, () =>
  console.log(`Your server is running on port number ${PORT}`)
);