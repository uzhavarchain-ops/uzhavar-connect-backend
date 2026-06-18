require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

app.get('/', (req, res) => {
    res.send('Uzhavar Connect Backend Running');
});

const FarmerSchema = new mongoose.Schema({
    name: String,
    phone: String,
    village: String
});

const Farmer = mongoose.model('Farmer', FarmerSchema);

app.post('/farmers', async (req, res) => {
    const farmer = await Farmer.create(req.body);
    res.json(farmer);
});

app.get('/farmers', async (req, res) => {
    const farmers = await Farmer.find();
    res.json(farmers);
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});