/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const express = require('express')
const { MongoClient } = require('mongodb')
const bodyParser = require('body-parser')

const app = express()
const jsonParser = bodyParser.json()

app.use(jsonParser)

app.post('/notebook', (req, res) => {
  MongoClient.connect('mongodb://localhost/notebook', (err, client) => {
    if (err) {
      console.log(err)
      process.exit(1)
    }
    const db = client.db('notebook')
    const notes = db.collection('notes')
    notes.insertOne(req.body, (err, result) => {
      if (err) {
        console.error(err)
      }
      else {
        console.log(result)
      }
      client.close()
    })
  })
})

app.listen(3000, () => {
  console.log('Listening on 3000!')
})
