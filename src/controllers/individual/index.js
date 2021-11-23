import Individual from '../../models/individual.js'

export const list = () => {
    const individual = new Individual()
    return individual.getUsers()
}