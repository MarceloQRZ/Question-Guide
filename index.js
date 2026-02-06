const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const connection = require('./database/database');
const Pergunta = require('./database/Pergunta');
const Resposta = require('./database/Resposta');
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
    Pergunta.findAll({ raw: true, order: [
        ['id', 'DESC']
    ] }).then(perguntas => {
        res.render("index", {
            perguntas: perguntas
        });

    });
    
});

app.get("/perguntar", (req, res) => {
    res.render("perguntar");
});

app.post("/salvarpergunta", (req, res) => {
    var titulo = req.body.titulo;
    var descricao = req.body.descricao;
    Pergunta.create({
        titulo: titulo,
        descricao: descricao
    }).then(() => {
        res.redirect("/");    
    })
});

app.get("/pergunta/:id", (req, res) => {
    var id = req.params.id;
    Pergunta.findOne({
        where: {id: id}
    }).then(pergunta => {
        if(pergunta != undefined){
            res.render("Pergunta", {
                pergunta: pergunta
            });
        }else{
            res.redirect("/");
        }
    })
});

app.listen(8080,()=>{
    console.log("Server is running on http://localhost:8080");
});