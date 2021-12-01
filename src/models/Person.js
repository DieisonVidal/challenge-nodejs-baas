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



// import { v4 as uuidv4 } from 'uuid';

// class Person {
//     constructor(id, cpf, name, email, phone) {

//         console.log('entrou no construtor')
//         this.id = uuidv4();
//         this.cpf = cpf;
//         this.name = name
//         this. email = email
//         this.phone = phone
//         created_at: new Date()
//     }

// }

// export default Person