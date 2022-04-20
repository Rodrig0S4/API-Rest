const express = require('express')
const app = express();
const data = require("./data.json");

app.use(express.json());

//Verbos HTTP
//GET: Receber dados de um Resource.
//POST: Enviar dados ou informações para serem processados por um Resource.
//PUT: Atualizar os dados de um cliente.
//DELETE:  Deletar um Resource.

//http://localhost:3030/clients

app.get('/clients', function (req, res) {
    //todos
    res.json(data);
});

app.get('/clients/:id', function (req, res) {
    //id
    const { id } = req.params
    const client = data.find(cli => cli.id = id)
    if (!client) return res.status(204).json();
    res.json(client);
});

app.post('/clients', function (req, res) {
    const { name, email } = req.body;
    //salvar 
    res.json({ name, email })
});

app.put('/clients/:id', function (req, res) {
    //update
    const { id } = req.params
    const client = data.find(cli => cli.id = id)
    if (!client) return res.status(204).json();
    const { name } = req.body;
    client.name = name;
    res.json(client);
});

app.delete('/clients/:id', function (req, res) {
    //delete
    const { id } = req.params
    const clientsFiltered = data.filter(client => client.id != id);

    res.json(clientsFiltered);
});

app.listen(3000, function () {
    console.log("Server is running");
});