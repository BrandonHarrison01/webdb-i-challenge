const express = require('express');

const db = require('./data/dbConfig.js');

const server = express();

server.use(express.json());


// UPDATE

server.post('/api/accounts', (req, res) => {
    const post = req.body;
    db('accounts')
        .insert(post, 'id')
        .then(post => res.status(200).json(post))
        .catch(error => res.status(500).json({ error: 'there was an error posting to account' }))
})

// READ

server.get('/api/accounts', (req, res) => {
    db.select('*').from('accounts')
        .then(result => res.status(200).json(result))
        .catch(error => res.status(500).json({ error: 'there was an error' }))
})

module.exports = server;