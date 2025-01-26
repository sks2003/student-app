const express = require('express')
const dotenv = require('dotenv')
const { MongoClient } = require('mongodb');
const bodyparser = require('body-parser')
const cors = require('cors')
const AuthRouter = require('./Routes/AuthRouter');
require('./Models/db');

dotenv.config()


// Connecting to the MongoDB Client
const url = process.env.MONGO_CONN;
const client = new MongoClient(url);
client.connect();

// App & Database
const dbName = process.env.DB_NAME
console.log(dbName)
const app = express()
const port = 3000

// Middleware
app.use(bodyparser.json())
app.use(cors())
app.use('/auth', AuthRouter)


// Get all the passwords
app.get('/ping', async (req, res) => {
    res.send("pong");
})
app.get('/', async (req, res) => {
    const db = client.db(dbName);
    const collection = db.collection('passwords');
    const findResult = await collection.find({}).toArray();
    res.json(findResult)
})

// Save a password
app.post('/', async (req, res) => {
    const password = req.body
    const db = client.db(dbName);
    const collection = db.collection('passwords');
    await collection.insertOne(password);
    const findResult = await collection.find({}).toArray();
    res.json(findResult)
})

// Delete a password by id
app.delete('/', async (req, res) => {
    const password = req.body
    const db = client.db(dbName);
    const collection = db.collection('passwords');
    await collection.deleteOne(password);
    const findResult = await collection.find({}).toArray();
    //console.log(findResult, "sss", password, password.site)
    const result = await db.collection(password.site).drop();
    res.json(findResult)
})

// Get all the student
app.get('/:slug', async (req, res) => {
    const slug = req.params.slug;
    // Use the slug for processing
    const db = client.db(dbName);
    //console.log(`Received slug: ${slug}`);
    const collection = db.collection(`${slug}`);
    const findResult = await collection.find({}).toArray();
    res.json(findResult)
})

// Save a student
app.post('/:slug', async (req, res) => {
    const slug = req.params.slug;
    const password = req.body
    const db = client.db(dbName);
    const collection = db.collection(`${slug}`);
    await collection.insertOne(password);
    const findResult = await collection.find({}).toArray();
    res.json(findResult)
})

// Delete a student by id
app.delete('/:slug', async (req, res) => {
    const slug = req.params.slug;
    const password = req.body
    const db = client.db(dbName);
    const collection = db.collection(`${slug}`);
    await collection.deleteOne(password);
    const findResult = await collection.find({}).toArray();
    res.json(findResult)
})

app.put('/:slug/:id', async (req, res) => {
    const slug = req.params.slug; // Collection name
    const id = req.params.id; // ID of the document
    const increment = req.body.increment || 1; // Default increment is 1
    const db = client.db(dbName);
    const collection = db.collection(`${slug}`);
    // Update the attendance field by the given increment value
    const result = await collection.updateOne(
        { id: id }, // Filter by ID
        { $inc: { attendence: increment } } // Increment/Decrement attendance
    );
    // Fetch the updated document
    const updatedDoc = await collection.findOne({ id: id });
    res.json(updatedDoc);
});



app.listen(port, () => {
    console.log(`Example app listening on  http://localhost:${port}`)
})