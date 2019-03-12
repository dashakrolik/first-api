const express = require('express')
const app = express()
const Sequelize = require('sequelize')
const connectionString = process.env.DATABASE_URL || 'postgres://postgres:LetMeIn@localhost:5432/postgres'
const sequelize = new Sequelize(connectionString, {define: { timestamps: false }})
const port = 4000
app.listen(port, () => `Listening on port ${port}`)

const House = sequelize.define('house', {
  title: Sequelize.STRING,
  description: Sequelize.TEXT,
  size: Sequelize.INTEGER,
  price: Sequelize.INTEGER
}, {
  tableName: 'houses'
})

House.sync() // this creates the houses table in your database when your app starts

// app.get('/houses/:id', function (req, res, next) {
//   const id = req.params.id
//   res.json({ message: `Read house of price ${house.price}` })
// })

const bodyParser = require('body-parser')
app.use(bodyParser.json())

//use this to execute: http POST localhost:4000/houses <<< '{ "title": "y" }'

// app.post('/houses', function (req, res) {
//   House
//     .create(req.body)
//     .then(house => res.status(201).json(house))
// })
//
// House.create({
//   title: 'Multi Million Estate',
//   description: 'This was build by a super-duper rich programmer',
//   size: 1235,
//   price: 98400000
// }).then(house => console.log(`The house is now created. The ID = ${house.id}`))

app.get('/houses', function (req, res, next) {
  House.findAll()
    .then(houses => {
      res.json({ houses: houses })
    })
    .catch(err => {
      res.status(500).json({
        message: 'Something went wrong',
        error: err
      })
    })
})

app.get('/houses/:id', function (req, res) {
  const id = req.params.id
    House
    .findById(id)
    .then(house => {
      res.json({ house: house })
    })
})

app.put('/houses/:id', function (req, res) {
  const id = req.params.id
    House
    .findById(id)
    .then(house => {
      house.update({ title: 'This is Sparta'})
    })
    .then(house => {res.json({ house: house })
  })
})

app.delete('/houses/:id', function (req, res) {
  const id = req.params.id
  House
  .findById(id)
  .then(house => {
    house.destroy()
  })
  .then(console.log('MWAAHAHA'))
})
