const express= require('express')
const cors= require('cors')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const port= process.env.PORT || 8000
const jwt = require('jsonwebtoken')
require('dotenv').config()

const app= express()

// medailewerey
app.use(cors())
app.use(express.json())


// database start
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.rge2daw.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
console.log(uri)

async function run(){
    const productCollection= client.db('product_Db').collection('BrandName')
    const categoryCollection= client.db('product_Db').collection('allProduct')
    const userCollection =client.db('product_Db').collection('users')
    try{
        app.get('/categoryname',async(req,res)=>{
            const query={}
            const result= await productCollection.find(query).toArray()
            res.send(result)
        })  
        app.post('/users',async(req,res)=>{
            const user=req.body;
            console.log(user)
            const result= await userCollection.insertOne(user)
            res.send(result)
        })
        app.get('/categorys', async(req, res) => {
            const query = {};
            const category = await categoryCollection.find(query).toArray()
            res.send(category)
          })
  
          //get single data
          app.get('/categorys/:id', async(req, res) => {
              const id = req.params.id;
              const filter = {category_id: (id)}
              const category = await categoryCollection.find(filter).toArray();
              res.send(category);
          })
        //   app.get('/category/:id', async(req, res) => {
        //       const id = req.params.id;
        //       const query = { _id: ObjectId(id)}
        //       console.log(query)
        //       const category = await categoryCollection.findOne(query);
        //       res.send(category);
        //   })
    }


    finally{

    }
}
run().catch(error=>console.log(error))

app.get('/',(req,res)=>{
    res.send('prodouct server is running')
})

app.listen(port,()=>{
    console.log(`product Server Is Running ${port}`)
})


