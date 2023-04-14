const connectDB = require('./db');
var cors = require('cors');
const dotenv = require('dotenv');

connectDB();
const express = require('express')
const app = express()
const port = 8000
app.use(cors())

app.use(express.json())

dotenv.config({path:'./config.env'});
const PORT =  8000;

//available routes
app.use('/api/authuser',require('./routes/authUser'))
app.use('/api/authagency',require('./routes/authAgency'))
app.use('/api/authdata',require('./routes/authData'))
app.use('/api/authbookedcar', require('./routes/authBcar'))

app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`)
  })
  