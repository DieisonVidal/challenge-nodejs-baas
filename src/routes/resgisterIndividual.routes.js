const express = require('express');
const individualRoutes = require('../routes/individual.routes')
const registerIndividualRoutes = express.Router();

registerIndividualRoutes.post('/individual', (req, res) => {
    
})

module.exports = registerIndividualRoutes;