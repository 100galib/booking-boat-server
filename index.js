const express = require('express');
const app = express();
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const port = process.env.PORT || 5000;
require('dotenv').config();


app.use(cors());
app.use(express.json());



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.w7wfspi.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

const run = async() => {
    try{
        const allBooking = client.db('booking-boat').collection('allcollection');

        app.get('/Booking', async(req, res) => {
            const email = req.query.email;
            const query = {email: email};
            console.log(query)
            const getBooking = await allBooking.find(query).toArray();
            res.send(getBooking);
        })
        
        app.post('/Booking', async(req, res) => {
            const booking = req.body;
            const setAllBooking = await allBooking.insertOne(booking);
            res.send(setAllBooking);
        })
    }
    finally{

    }
}
run().catch(error => console.log(error));

app.get('/', (req, res) => {
    res.send('booking Portal is running');
})

app.listen(port, () => {
    console.log(`backen portal is running ${port}`)
})