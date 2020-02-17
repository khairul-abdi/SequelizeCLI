const express = require('express')
const bodyParser = require('body-parser')
// const deptModel = require('./models').department
// const empModel = require('./models').emp
const deptModel = require('./models/department')
const empModel = require('./models/emp')

const app = express()

// fetch from data from the request
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.post('/adddept', (req, res) => {
  // it will add data to department table
  deptModel.create(req.body)
  .then(data => res.json({da: data}))
  .catch(err => res.json({er: err}))
})

app.post('/addemp', (req, res) => {
  // it will add data to emp table
  empModel.create(req.body)
  .then(data => res.json({da: data}))
  .catch(err => res.json({er: err}))
})

app.post('/deldept/:id', (req, res) => {
  // it will delete particular department data
  deptModel.destroy({where:{id: req.params.id}})
  .then(data => res.json({da: data}))
  .catch(err => res.json({er: err}))
})

app.get('/', (req, res) => {
  // it will join the tables and display data
  empModel.findAll({include:[{model:deptModel}]})
  .then(data => res.json({da: data}))
  .catch(err => res.json({er: err}))
})

const port = process.env.PORT || 3000
app.listen(port, ()=> console.log(`Server running at port ${port}`))