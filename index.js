const express= require('express')
const cors= require('cors')
const port= process.env.PORT || 5000
const jwt = require('jsonwebtoken')
require('dotenv').config()

const app= express()

// medailewerey
app.use(cors())
app.use(express.json())


// database start
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://<username>:<password>@cluster0.rge2daw.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
console.log(uri)


async function run(){
    try{

    }


    finally{

    }
}
run().catch(error=>console.log(error))

app.get('/',(req,res)=>{
    res.send('aircnc server is running')
})

app.listen(port,()=>{
    console.log(`aireCnC Server Is Running ${port}`)
})


