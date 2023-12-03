require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

app.use(express.json());
app.use(cors());

app.listen(3000, () => {
    console.log('Servidor na porta 3000');
});

const User = require('./User');

app.use(express.urlencoded({ extended: true }));

app.post('/login', async (req, res) => {
    const { nickname, password } = req.body;
    const jsonPath = path.join(
        __dirname,
        '.',
        'db',
        'banco-dados-usuario.json'
    );
    const data = JSON.parse(
        fs.readFileSync(jsonPath, { encoding: 'utf8', flag: 'r' })
    );

    //verifica se existe usuario com o nick digitado
    for (let user of data) {
        if (user.nickname === nickname) {
            if (password && user.password) {
                const senhaValidada = await bcrypt.compare(
                    password,
                    user.password
                );
                if (senhaValidada) {
                    const token = jwt.sign(user, process.env.TOKEN);
                    console.log('usuario validado');
                    return res.json({ token: token });
                } else
                    return res.status(422).send(`Usuario ou senha incorretos.`);
            } else {
                return res.status(500).send(`Erro interno no servidor.`);
            }
        }
    }
    return res
        .status(409)
        .send(
            `Usuario com nick ${nickname} não existe. Considere criar uma conta!`
        );
});

app.post('/create', async (req, res) => {
    const { nickname, email, password } = req.body;
    const jsonPath = path.join(
        __dirname,
        '.',
        'db',
        'banco-dados-usuario.json'
    );
    const data = JSON.parse(
        fs.readFileSync(jsonPath, { encoding: 'utf8', flag: 'r' })
    );
    for (let user of data) {
        if (user.email === email) {
            res.status(409).send(`Usuario com email ${email} já existe.`);
            break;
        }
    }
    const id = data.length + 1;

    const salt = await bcrypt.genSalt(10);
    const senhaCrypt = await bcrypt.hash(password, salt);

    const novo = new User(id, nickname, email, senhaCrypt);
    data.push(novo);
    fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2));
    res.send(`Tudo certo usuario criado com sucesso.`);
});

function verificaToken(req, res, next) {
    const authHeaders = req.headers['authorization'];

    const token = authHeaders && authHeaders.split(' ')[1];
    //Bearer token

    if (token == null) return res.status(401).send('Acesso Negado');

    jwt.verify(token, process.env.TOKEN, (err) => {
        if (err) return res.status(403).send('Token Inválido/Expirado');
        next();
    });
}
