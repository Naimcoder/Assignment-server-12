const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const port = process.env.PORT || 8000;
const jwt = require("jsonwebtoken");
require("dotenv").config();
const app = express();

// medailewerey
app.use(cors());
app.use(express.json());

// database start
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.rge2daw.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  // database collection
  const productCollection = client.db("product_Db").collection("BrandName");
  const categoryCollection = client.db("product_Db").collection("allProduct");
  const userCollection = client.db("product_Db").collection("users");
  const bookingsCollection = client.db("product_Db").collection("bookings");
  const AdvertiseCollection = client.db("product_Db").collection("Advertise");
  try {
    //categoryname get
    app.get("/categoryname", async (req, res) => {
      const query = {};
      const result = await productCollection.find(query).toArray();
      res.send(result);
    });

    //all users post
    app.post("/users", async (req, res) => {
      const user = req.body;
      console.log(user);
      const result = await userCollection.insertOne(user);
      res.send(result);
    });

    // advertise post
    app.post("/advertise", async (req, res) => {
      const addvertise = req.body;
      const result = await AdvertiseCollection.insertOne(addvertise);
      res.send(result);
    });

    // advertise get
    app.get("/advertise", async (req, res) => {
      const query = {};
      const result = await AdvertiseCollection.find(query).toArray();
      res.send(result);
    });

    //categorys get
    app.get("/categorys", async (req, res) => {
      const query = {};
      const category = await categoryCollection.find(query).toArray();
      res.send(category);
    });

    //get single categorys
    app.get("/categorys/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { category_id: id };
      const category = await categoryCollection.find(filter).toArray();
      res.send(category);
    });

    // all boooking post
    app.post("/bookings", async (req, res) => {
      const bookings = req.body;
      const result = await bookingsCollection.insertOne(bookings);
      res.send(result);
    });
    //categorys post
    app.post("/categorys", async (req, res) => {
      const caregory = req.body;
      const result = await categoryCollection.insertOne(caregory);
      res.send(result);
    });

    //all user get
    app.get("/users", async (req, res) => {
      const query = {};
      const users = await userCollection.find(query).toArray();
      res.send(users);
    });

    //admin get
    app.get("/users/admin/:email", async (req, res) => {
      const email = req.params.email;
      const query = { email };
      const user = await userCollection.findOne(query);
      res.send({ isAdmin: user?.role === "admin" });
    });

    // admin role
    app.patch("/users/admin/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: ObjectId(id) };
      const options = { upsert: true };
      const updatedDoc = {
        $set: {
          role: "admin",
        },
      };
      const result = await userCollection.updateOne(
        filter,
        updatedDoc,
        options
      );
      res.send(result);
    });

    // verifyed patch
    app.patch("/users/verifyed/:id", async (req, res) => {
      const id = req.params.id;
      const user = req.body;
      const filter = { _id: ObjectId(id) };
      const options = { upsert: true };
      const updatedDoc = {
        $set: {
          verifyed: user.verifyed,
        },
      };
      const result = await userCollection.updateOne(
        filter,
        updatedDoc,
        options
      );
      res.send(result);
    });


    // sing categorys product deleted
    app.delete("/categorys/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await categoryCollection.deleteOne(query);
      res.send(result);
    });


    //  admin deleted
    app.delete("/users/admin/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await userCollection.deleteOne(query);
      res.send(result);
    });


    //all bookings
    app.get("/bookings", async (req, res) => {
      let query = {};
      if (req.query.email) {
        query = {
          email: req.query.email,
        };
      }
      const result = await bookingsCollection.find(query).toArray();
      res.send(result);
    });
  } finally {
  }
}

run().catch((error) => console.log(error));

app.get("/", (req, res) => {
  res.send("prodouct server is running");
});

app.listen(port, () => {
  console.log(`product Server Is Running ${port}`);
});
