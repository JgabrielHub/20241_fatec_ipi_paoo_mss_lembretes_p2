require('dotenv').config()
const express = require('express')
const axios = require('axios')
const app = express()
//aplicando um middleware
app.use(express.json())

const eventos = []

//aqui recebemos todos os eventos
//e repassamos para todos os mss
app.post('/eventos', async (req, res) => {
  //aqui pegamos o evento
  const evento = req.body
  eventos.push(evento)
  console.log(evento)

  try {
    if(evento.type === "LembreteClassificado"){
      await axios.post('http://localhost:4000/eventos', evento) //lembrete
    }
    if(evento.type === "ObservacaoClassificada"){
      await axios.post('http://localhost:5000/eventos', evento) //observacao 
    }
    if(evento.type !== 'ObservacaoClassificada'){
    await axios.post('http://localhost:6000/eventos', evento) //consulta
    }
    if(evento.type === "ObservacaoCriada" || evento.type === "LembreteCriado"){
      await axios.post('http://localhost:7000/eventos', evento) //classificacao
    }

} catch (error) {
  
}
res.status(200).end()
})

app.get('/eventos', (req, res) => {
  res.status(200).json(eventos)
})

app.listen(
  process.env.PORT, 
  () => console.log(`Barramento: ${process.env.PORT}`)
)