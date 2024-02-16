const express = require("express");
const urlRoute = require("./routes/url");
const { connectToMongoDB } = require("./connect");

const app = express();
const PORT = 8002;

connectToMongoDB("mongodb://127.0.0.1:27017/short-url").then(() => console.log('MongoDB Connected'))
    .catch(err => console.log('Mongo error', err));

// Middleware to parse URL-encoded bodies
app.use(express.json());

app.use('/jshorturl', urlRoute);

app.listen(PORT, "172.16.68.51", () => console.log(`Server started at Port ${PORT}`));

