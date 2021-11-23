import Individual from "../../models/Individual.js"

export const createdIndividual = (require, response)=>{
    const individual = new Individual();
    
}

export const getIndividuals = (require, response)=>{
 
    const arrIndividuals = [
        { name: 'Dieison', age: 14 },
        { name: 'Jonathan', age: 14.001 }
    ];

    response.json(arrIndividuals);
};
