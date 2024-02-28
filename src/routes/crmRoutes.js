import {addNewContact, getContacts, getContactById, updateContact, deleteContact} from '../controllers/crmController'
import {login, loginRequired, registerUser} from '../controllers/userController';
const routes = (app) => {

    app.route('/contact')
    .get((req, res, next) =>{
       //middle-ware example
       //You can do api key validation here.
        console.log(`Request from: ${req.originalUrl}`)
        console.log(`Request method: ${req.method}`)
        next();  
    }, loginRequired, getContacts)
    .post(loginRequired, addNewContact)

    //get contact, update contact and delete contact route.
    app.route('/contact/:contactId')
    .get(loginRequired, getContactById)
    .put(loginRequired, updateContact)
    .delete(loginRequired, deleteContact)

    //register user route.
    app.route('/auth/register')
    .post(registerUser)

    //login route.
    app.route('/login')
    .post(login)
}

export default routes;
