const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const connection = require('./database/database');
const PerguntaModel = require('./database/Pergunta');
// Database connection
connection
    .authenticate()
    .then(() => {
        console.log("Database connected successfully!");
    })
    .catch((msgErro) => {
        console.log("Error: " + msgErro);
    });

// EJS Setup
app.set('view engine', 'ejs');
app.use(express.static('public'));
// Body Parser Setup
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Routes
app.get('/', (req, res) => {
    res.render('index');
});

app.get("/perguntar", (req, res) => {
    res.render("perguntar");
});

app.post("/salvarpergunta", (req, res) => {
    var titulo = req.body.titulo;
    var descricao = req.body.descricao;
    res.send("Título:" + titulo + "<br>Descrição: " + descricao);
});

app.listen(8080,()=>{
    console.log("Server is running on http://localhost:8080");
});