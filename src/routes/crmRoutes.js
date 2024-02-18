import {addNewContact, getContacts, getContactById, updateContact} from '../controllers/crmController'

const routes = (app) => {

    app.route('/contact')
    .get((req, res, next) =>{
       //middle-ware example
       //You can do api key validation here.
        console.log(`Request from: ${req.originalUrl}`)
        console.log(`Request method: ${req.method}`)
        next();  
    }, getContacts)
    .post(addNewContact)

    app.route('/contact/:contactId')
    .get(getContactById)
    .put(updateContact)
    .delete((req, res) =>
      res.send('Delete request successfull.')
    )
}

export default routes;
