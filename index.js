const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const userRoute = require('./routes/userRoutes');
//middlwire
app.use(express.json());
require('dotenv').config()

//routes

app.use('/user',userRoute)

app.use((req,res)=>{
    res.send('<h1> 404! not a valid url</h1>')
})
app.listen(port,()=>{
    console.log('app is runnign at port 3000')
})