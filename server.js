require ('dotenv').config()
const express = require ('express')
const app = express ()
const morgan = require ('morgan')
const cors = require ('cors')
const apiRouter = require ('./apiRouter')

// Log do app
app.use (morgan ('common'))

app.set ('view engine', 'ejs')
app.set ('views', 'views')

app.use ('/site', express.static('site', {index: ['app.html', 'index.html']}))
app.use ('/app', (req, res, next) => {
    res.status(200).render('index', {message: "Olá Mundo"})
})
app.use ('/api', apiRouter)

app.use ((req, res) => {
    res.status (404).send ('Recurso não existente')
})

// apiRouter.get(endpoint + 'produtos', (req, res) => { 
//     knex.select('*').from('produto') 
//     .then( produtos => res.status(200).json(produtos) ) 
//     .catch(err => { 
//         res.status(500).json({  
//            message: 'Erro ao recuperar produtos - ' + err.message }) 
//     })   
// })

// apiRouter.get(endpoint + 'produtos/:id', (req, res) => { ... }) 
// apiRouter.post(endpoint + 'produtos', (req, res) => { ... }) 
// apiRouter.put(endpoint + 'produtos/:id', (req, res) => { ... }) 
// apiRouter.delete(endpoint + 'produtos/:id', (req, res) => { ... }) 

port = process.env.PORT || 3000
app.listen (port, () => {
    console.log (`servidor rodando em http://localhost:${port}`)
})