require('dotenv').config()
const express = require('express');
const indexRouter = require('./routes/index')
const employeesRouter = require('./routes/employees')
const usersRouter = require('./routes/users')
const mongoose = require('mongoose');
const passport = require('passport');


const app = express();

require('./config/passport')(passport);




app.use(express.json());


mongoose.connect(process.env.DATABASE_URL,{
    useNewUrlParser:true,
    useUnifiedTopology: true
})

const db = mongoose.connection
db.on('error',(err)=>{
    console.log("There was an error in the DB connction..."+err)
})
db.once('open',()=>{
    console.log("Conncted to DB ")
})

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

app.use('/',indexRouter)
app.use('/employees',employeesRouter)
app.use('/users',usersRouter)

app.listen(process.env.PORT,()=>{
console.log("Server started on port "+process.env.PORT)
})

