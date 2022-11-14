const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
//importing Oauth2Client from google-auth-library package 
//const { OAuth2Client } = require("google-auth-library");
const googleRoutes = require("./routes/google");


dotenv.config();
const port =  5000;
//creating the client
//const client = new OAuth2Client("114914030611-askhm7c3r7pnhp8b7rq87qbvt8ncb2sb.apps.googleusercontent.com");

//setting up the express app
const app = express(); 

//connecting to the database
mongoose.connect("mongodb+srv://google:google@cluster0.i3px0s3.mongodb.net/?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log("Connected to the database");
});


//to parse the body of the request
app.use(express.json());

//add middleware 
app.use('/', googleRoutes)

//define the users array
//const users = [];

//define upsert function
//adding the user to the users array
// function upsert(array, item) {
//   const i = array.findIndex((_item) => _item.email === item.email);
//   if (i > -1) array[i] = item;
//   else array.push(item);
// }


//post route for google login
//app.post("/api/google-login", async (req, res) => {
  //getting the token from the request body
  // const { token } = req.body;
  // const ticket = await client.verifyIdToken({
  //   idToken: token,
  //   // Specify the CLIENT_ID of the app that accesses the backend
  //   audience: "114914030611-askhm7c3r7pnhp8b7rq87qbvt8ncb2sb.apps.googleusercontent.com",
  // });

  // //getting the payload from the ticket
  // const { name, email, picture } = ticket.getPayload();
  // //creating the user object
  // upsert(users, { name, email, picture });
  // //sending the response
  // res.status(201);
  // //sending the response to frontend
  // res.json({ name, email, picture });
//});

//app listening on port 5000
app.listen(port, () => {
  console.log(
    `Server is ready at http://localhost:${port}`
  );
});


module.exports = app;