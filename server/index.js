const express = require("express")
const mysql = require("mysql")
const cors = require("cors")

const app = express()

app.use(express.json())
app.use(cors())

const db = mysql.createConnection({
  host: "localhost",
  user: "root1",
  password: "123456",
  insecureAuth: true,
  database: "loginTest"
})

db.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});

app.get('/users', (req, res) => {
  db.query("SELECT * FROM users", function (err, result, fields) {
    if (err) throw err
    console.log(result)
  })
})

app.post('/register', (req, res) => {
  const username = req.body.username
  const password = req.body.password
  db.query("INSERT INTO users (username, password) VALUES (?,?)", [username, password], function (err, result, fields) {
    if (err) throw err
    console.log(result)
  })
})

app.post('/login', (req, res) => {
  const username = req.body.username
  const password = req.body.password
  db.query("SELECT * FROM users WHERE username = ? AND password = ?", [username, password], function (err, result, fields) {
    if (err) {
      res.send({ err: err })
    }

    if (result.length > 0) {
      res.send(result)
    } else {
      res.send({ message: "Wrong username/password combination" })
    }
  })
})

app.listen(3001, () => {
  console.log("server running")
})