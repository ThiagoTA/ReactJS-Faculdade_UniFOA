const express = require('express')
const cors = require('cors')

const { uuid, isUuid } = require('uuidv4')
// uuid - universal unique identifier (id)
const app = express()

app.use(cors())
app.use(express.json())

const projects = [];

function logRequests(req, res, next) {
  const { method, url } = req
  const logLabel = `[${method.toUpperCase()}] ${url}`
  console.time(logLabel)

  next()

  console.timeEnd(logLabel)
}

const validadeProjectId = (req, res, next) => {
  const { id } = req.params

  if (!isUuid(id)) {
    return res.status(400).json({ error: 'Id de Projeto inválido'})
  }

  return next()
}

app.use('/projects/:id', validadeProjectId)


app.get('/projects', logRequests, (req, res) => {

  const { title } = req.query;

  const results = title
    ? projects.filter(p => p.title.includes(title))
    : projects

  return res.json(results)
})

app.post('/projects', (req, res) => {
  const { title, owner } = req.body

  const project = { id: uuid(), title, owner }

  projects.push(project)

  return res.json(project)

})

app.put('/projects/:id', (req, res) => {

  const { id } = req.params
  const { title, owner } = req.body

  const findIndex = projects.findIndex(p => p.id === id)

  console.log(findIndex)

  if (findIndex < 0) {
    return res.status(400).json({ error: 'Project not found' })
  }

  const project = {
    id,
    title,
    owner
  }

  projects[findIndex] = project

  return res.json(project)

})

app.delete('/projects/:id', (req, res) => {

  const { id } = req.params

  const findIndex = projects.findIndex(p => p.id === id)

  if (findIndex < 0) {
    return res.status(401).json({ error: 'Project not found' })
  }

  projects.splice(findIndex, 1)

  return res.status(204).json({})
})


app.listen(3333, () => {
  console.log('Servidor rodando')
})