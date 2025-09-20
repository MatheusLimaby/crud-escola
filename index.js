const express = require('express')
const cors = require('cors')

const app = express()
app.use(cors())
app.use(express.json())


// TODO: Membro 1 - Importar e mapear rota de alunos

const AlunosRouter = require('./Routes/alunos')
app.use(AlunosRouter)



//executar a aplicação

const professoresRouter = require('./routes/professores')
app.use(professoresRouter)

app.listen(3000, () => {
    console.log("Aplicação rodando em http://localhost:3000")
    })