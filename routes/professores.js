const express = require('express')
const router = express.Router()




// lista de pessoas pra simular o banco dados
let listaProfessores = [
  {
    id: 1,
    nome: "Claudio",
    cpf: "00100100101",
    email: "claudio@gmail.com",
    curso: "Matemática", 
    disciplina: "Álgebra"
  },
  {
    id: 2,
    nome: "Lorena",
    cpf: "00200200202",
    email: "lorena@gmail.com",
    curso: "História",
    disciplina: "Guerra Fria"
  },
]

// mapear as rotas e a lógica
// #Busca
// GET /pessoas
router.get('/professores', (req, res, next) => {
  res.json(listaProfessores)
})

// #Busca por id
// GET /pessoas/:id
router.get('/professores/:id', (req, res, next) => {
  // recebendo o ID como parametro dinâmico
  const id = req.params.id
  // faço a busca na lista de pessoas pelo id recebido
  const professor = listaProfessores.find(professor => professor.id == id)
  if (!professor) {
    return res.status(404).json({ error: "Professor não encontrado!!!" })
  }
  res.json(professor)
})

// #Criação
// POST /pessoas
router.post('/professores', (req, res, next) => {
  const { nome, cpf, email, curso, disciplina } = req.body
  // Validando se todos os campos foram preenchidos
  if (!nome || !cpf || !email || !curso || !disciplina) {
    return res.status(400).json({ error: "Campos obrigatórios a serem preenchidos! (Nome, CPF, E-mail, Curso, Disciplina)" })
  }

  // validar se o cpf já foi cadastrado
  if (listaProfessores.some(pessoa => pessoa.cpf == cpf)) {
    return res.status(409).json({ error: "CPF já cadastrado!!!" })
  }

  const novoProfessor = {
    id: Date.now(),
    nome,
    cpf,
    email,
    curso,
    disciplina
  }

  listaProfessores.push(novoProfessor)
  res.status(201).json({ message: "Professor cadastrada com sucesso!", novoProfessor })
})

// #Atualização
// PUT /pessoas/:id
router.put('/professores/:id', (req, res, next) => {
  const id = req.params.id
  const professor = listaProfessores.find(professor => professor.id == id)
  // valido se a pessoa existe
  if (!professor) {
    return res.status(404).json({ error: "Professor não encontrado!" })
  }
  // validando se os dados pra atualizar vinheram na requisição
  const { nome, email, curso, disciplina, cpf } = req.body
  if (!nome || !email || !curso || !disciplina || !cpf) {
    return res.status(400).json({ error: "Campos obrigatórios a serem preenchidos! (Nome, CPF, E-mail, Curso, Disciplina)" })
  }
  // atualizo os dados da pessoa
  professor.nome = nome
  professor.email = email
  professor.curso = curso
  professor.disciplina = disciplina
  professor.cpf = cpf
  // responde com os dados da pessoa atualizados 
  res.json({ message: "Professor atualizada com sucesso!!!", professor })
})

// #Remoção
// DELETE /pessoas/:id
router.delete('/professores/:id', (req, res, next) => {
  const id = req.params.id
  // validar se a pessoa não existe
  const professor = listaProfessores.find(professor => professor.id == id)
  if (!professor) {
    return res.status(404).json({ error: "pessoa não encontrada!!!"})
  }

  listaProfessores = listaProfessores.filter(professor => professor.id != id)
  res.json({ message: "Professor excluido com sucesso!!!"})
})


// exportar o roteador
module.exports = router