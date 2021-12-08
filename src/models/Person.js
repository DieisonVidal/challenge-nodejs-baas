import mongoose from 'mongoose';

const PersonModel = {
    cpf: { 
        type: String,
        required: true 
    } ,
    full_name: { 
        type: String,
        required: true 
    },
    email: { 
        type: String,
        required: true 
    },
    phone: { 
        type: Number,
        required: true 
    },
    username: { 
        type: String,
        required: true 
    },
    password: { 
        type: String,
        required: true 
    } 
}
    
const Person = mongoose.model('Person', PersonModel);

export default Person;