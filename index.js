const express = require('express');
const mongoose = require('mongoose');

require('dotenv').config();
const app = express();
app.use(express.json());





app.get('/', (req, res) => {
    return res.status(200).json({
        status: 1,
        message: 'Server is working!!'
    })
})

// router import 
const userRoutes = require('./routes/User');
app.use('/api/v1/user', userRoutes);


async function main() {
    try {
        const url = process.env.MONGODB_URI;
        const port = process.env.PORT;

        await mongoose.connect(url, {
            useNewUrlParser: true
        });

        console.log("database connected");

        app.listen(port, () => console.log(`Server is runnig on port: ${port}`))

    } catch (error) {
        console.log(error);

    }
}

main();











