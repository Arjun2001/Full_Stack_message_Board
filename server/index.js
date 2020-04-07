const express = require('express');
const cors = require('cors');
const bodyParser= require('body-parser');
const morgan = require('morgan');

const messages = require('./db/Messages');

const app = express();

app.use(morgan('tiny'));
app.use(cors());
app.use(bodyParser.json());

// app.use(cors({
//     'allowedHeaders': ['Content-Type'],
//     'origin': '*',
//     'preflightContinue': true
//   }));

app.get('/', (req,res)=> {
    res.json({
        message: "full stack meassge board! 🎉🎉"  
    });
});

app.get('/messages', (req,res)=> {
    messages.getAll().then((messages) => {
        res.json(messages);
    });
});

app.post('/messages', (req, res) => {
    console.log(req.body);
    messages.create(req.body).then((message) => {
        res.json(message);
    }).catch((err) =>{
        res.status(500);
        res.json(err);
    })
});

const port = process.env.PORT || 1234;
app.listen(port,  ()=> {
    console.log(`Listening on port ${port}`);
});