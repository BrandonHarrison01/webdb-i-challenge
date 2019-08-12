const express = require('express');

const db = require('./data/dbConfig.js');

const server = express();

server.use(express.json());


// CREATE

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


// READ BY ID

server.get('/api/accounts/:id', (req, res) => {
    db('accounts')
        .where({ id: req.params.id })
        .first()
        .then(account => {
            res.status(200).json(account)
        })
        .catch(error => {
            res.status(500).json({ error: 'there was an error getting account' })
        })
})

// UPDATE

server.put('/api/accounts/:id', (req, res) => {
    const changes = req.body;

    db('accounts')
        .where('id', '=', req.params.id)
        .update(changes)
        .then(count => {
            if (count > 0) {
                res.status(200).json(count)
            } else {
                res.status(404).json({ error: 'account not found' })
            }
        })
    .catch(error => {
        res.status(500).json({ error: 'there was an error updating account' })
    })
})


// DELETE

server.delete('/api/accounts/:id', (req, res) => {
    db('accounts')
        .where('id', '=', req.params.id)
        .del()
        .then(count => {
            if (count > 0) {
                res.status(200).json(count)
            } else {
                res.status(404).json({ error: 'account not found' })
            }
        })
        .catch(error => {
            res.status(500).json({ error: 'there was an error deleting account'})
        })
})

module.exports = server;