require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');

const Message = require('./models/Message');

const app = express();
app.use(cors());
app.use(bodyParser.json());

//MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('MongoDB Connected'))
    .catch(err => console.error(err));

//nodemailer setUp
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

//API Endpoint (Database + Email)
app.post('/api/contact', async (req, res) => {
    const {name, email, message} = req.body;

    try{
        //save database
        const newMessage = new Message({name, email, message});
        await newMessage.save();

        //Email pathano
        const mailOptions = {
            from: email,
            to: process.env.EMAIL_USER,
            subject: `Message from ${name}`,
            text: `Name: ${name}\nEmail: ${email}\n\n${message}`
        };

        await transporter.sendMail(mailOptions);

        //Success Response
        res.status(200).json({
            message: 'Message saved and email send successfully'
        });
    }
    catch(error){
        console.error(error);
        res.status(500).json({error: 'Failed to process message.'});
    }
});

//server STArt
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});