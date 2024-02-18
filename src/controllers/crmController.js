import mongoose from 'mongoose';
import {ContactSchema} from '../models/crmModels';

const Contact = mongoose.model('Contact', ContactSchema);

export const addNewContact = async (req, res) => {
    let newContact = new Contact(req.body)
    try{
        let contact = await newContact.save()
        res.json(contact)
    }
    catch(err){
        res.send(err)
    }
}