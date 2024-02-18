import {addNewContact} from '../controllers/crmController'

const routes = (app) => {

    app.route('/contact')
    .get((req, res, next) =>{
       //middle-ware example
       //You can do api key validation here.
        console.log(`Request from: ${req.originalUrl}`)
        console.log(`Request method: ${req.method}`)
        next();  
    },(req, res, next) => {
        res.send('Get request successfull.')
    })
    .post(addNewContact)

    app.route('/contact/:contactId')
    .put((req, res) =>
      res.send('Put request successfull.')
    )
    .delete((req, res) =>
      res.send('Delete request successfull.')
    )
}

export default routes;
