import { v4 as uuidv4 } from "uuid";

class Individual {

    constructor(id, cpf, name) {

        console.log('entrou no construtor')
        this.id = uuidv4();
        this.cpf = cpf;
        this.name = name
        created_at: new Date()
    }

}

export default Individual