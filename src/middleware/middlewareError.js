import { persons } from "../controllers/persons/controllerPersons.js";

export const verifyIfExistsPersonCPF = (req, res, next) => {
    //desestruturação atraves do headers para obter o cpf do cliente
    const { cpf } = req.headers;

    // Verificando no Array de persons/clientes se existe algum cliente com o cpf informado. 
    const person = persons.find(person => person.cpf === cpf);

    if (!person) {
        return res.status(400).json({ error: "Person not found" });
    }
    // Inserindo info dentro do req(request)
    req.person = person;

    return next();
}