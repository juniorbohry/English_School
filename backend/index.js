const express = require('express')
const cors = require('cors')
const conn = require('./db/conn')

//models
const Person = require('./models/Person')
const Level = require('./models/Level')
const Classenglish = require('./models/Classenglish')
const Enrollment = require('./models/Enrollment')

const app = express()

// Config JSON response
app.use(
    express.urlencoded({
      extended: true,
    }),
)
app.use(express.json())

//solve cors
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }))

//Routes
const PersonRoute = require('./routes/PersonRoute')
const LevelRoute = require('./routes/LevelRoute')
const ClassEnglishRoute = require('./routes/ClassEnglishRoute')
const EnrollmentRoute = require('./routes/EnrollmentRoute')
app.use('/person', PersonRoute)
app.use('/level', LevelRoute)
app.use('/class', ClassEnglishRoute)
app.use('/enrollment', EnrollmentRoute)


// Criar tabelas e rodar o app
conn
  // .sync()
  .sync({force: true})
  .then(() => {
    app.listen(5000)
  })
  .catch((err) => console.log(err))