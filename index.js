import express from 'express'
import passport from 'passport'
import bodyParser from 'body-parser'
import router from './router'

// Initialize http server
const app = express()
const port = process.env.PORT || 5000

// Make the server CORS-ENABLE
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({extended: true})) // for parsing application/x-www-form-urlencoded

// initialize passport
app.use(passport.initialize())

app.get('/', (req, res) => {
  res.send('Project1 Backend')
})

// Handle / route
app.use('/v1', router)

// Launch the server on port 3000
const server = app.listen(port, () => {
  console.log('Listening at application server at port ' + port)
})
