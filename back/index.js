const express = require('express');
const app = express();
const fs = require('fs');
const cors = require('cors');
const { stringify } = require('querystring');

app.use(express.json());
app.use(cors());

app.listen(3000, () => {
    console.log('Servidor na porta 3000');
});

const User = require('./User');

app.use(express.urlencoded({ extended: true }));

app.post('/pages/Home', (req, res) => {
    const {email, senha} = req.body
    const data = JSON.parse(fs.readFileSync('./db/banco-dados-usuario.json', { encoding: 'utf8', flag: 'r' }));
    for(let user of data){
        if(user.email === email) {
            if(user.senha === senha) {
                res.send('Autenticado com Sucesso')
                break;
            }else{
                    res.send('Usuario ou senha incorretos')
                }                   
                
            }
        }
        res.send(`Usuario com email ${email} não
                existe. Crie uma conta para logar!.`)
    }); 

app.post('/create', (req, res) => {
    const {nickname, email, senha} = req.body
    const data = JSON.parse(fs.readFileSync('./db/banco-dados-usuario.json', { encoding: 'utf8', flag: 'r' }));
    for(let user of data){
        if(user.email === email) {
            res.status(409).send(`Usuario com email ${email} não
            existe. Crie uma conta para logar!.`)
            break;
        }
        const id = data.length + 1;

        const novo = new User(id, nickname, email, senha);
            data.push(novo);
            fs.readFileSync('./db/banco-dados-usuario.json', JSON,
            stringify(data, null, 2),
            res.send('Usuario criado com sucesso.'));
        }
    }
);
