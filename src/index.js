const express = require('express');
const {uuid, isUuid} = require('uuidv4');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());


const projects = [];


function logRequest (req, res, next) {
    const { method, url } = req;
    
    const logViewer = `[${method}] - ${url}`;

    console.time(logViewer);

    next();

    console.timeEnd(logViewer);

}

function validateIDProject (req, res, next) {
    const {id} = req.params;

    if (!isUuid(id)){
        return res.status(400).json({error: 'Invalid Project ID!'})
    }

    return next();
}


app.use(logRequest);

app.use('/projects/:id', validateIDProject);

app.get('/projects', (req, res) => {
    //const {title, owner} = req.query;

    return res.json(projects);
})

app.post('/projects', (req, res) => {
    const {title, owner } = req.body
    const project = { id: uuid(), title, owner};

    projects.push(project);
    return res.json(project)
})

app.put('/projects/:id', (req, res) => {
    const {id} = req.params;
    const { title, owner} = req.body;

    const projectIndex = projects.findIndex(project => project.id === id);

    
    if (projectIndex < 0) {
        return res.status(400).json({ error: "Project not found!"})
    }

    const project = {
        id,
        title,
        owner
    };

    projects[projectIndex] = project;
    
    return res.json(project);
})


app.delete('/projects/:id', (req, res) => {
    const {id} = req.params;

    const projectIndex = projects.findIndex(project => project.id === id);

    
    if (projectIndex < 0) {
        return res.status(400).json({ error: "Project not found!"});
    }

    projects.splice(projectIndex, 1);

    return res.status(200).json({ message: "Project Deleted"});
})

app.listen(3000, () => console.log('Server Started!'));