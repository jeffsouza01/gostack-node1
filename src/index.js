const express = require('express');
const { response } = require('express');

const app = express();

app.use(express.json());

app.get('/projects', (req, res) => {
    const {title, owner} = req.query;

    console.log(`${title} e ${owner}`);

    return res.json([
        'Project 1',
        'Project 2',
        'Project 3'
    ]);
})

app.post('/projects', (req, res) => {
    const body = req.body;

    console.log(body);

    return res.json([
        'Project 4',
        'Project 5',
        'Project 6'
    ])
})

app.put('/projects/:id', (req, res) => {
    const {id} = req.params;

    console.log(id);
    
    return res.json([
        'Project 6',
    ])
})


app.delete('/projects/:id', (req, res) => {
    const {id} = req.params;

    console.log(id);

    return res.json([
        'Project 2'
    ])
})

app.listen(3000, () => console.log('Server Started!'));