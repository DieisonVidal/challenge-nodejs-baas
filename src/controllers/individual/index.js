import { response } from 'express';
import Individual from '../../models/individual.js';

export const getIndividuals = (require, response)=>{
 
    const arrIndividuals = [
        { name: 'Dieison', age: 14 },
        { name: 'Jonathan', age: 14.001 }
    ];

    response.send(arrIndividuals);
};

export const list = () => {
    const individual = new Individual();
    return individual.getIndividuals();
};