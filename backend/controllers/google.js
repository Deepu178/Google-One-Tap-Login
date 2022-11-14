const google = require("../models/google");
//import oauth2Client from google-auth-library
const { OAuth2Client } = require("google-auth-library");

const client = new OAuth2Client("114914030611-askhm7c3r7pnhp8b7rq87qbvt8ncb2sb.apps.googleusercontent.com");
const users = [];
function upsert(array, item) {
  const i = array.findIndex((_item) => _item.email === item.email);
  if (i > -1) array[i] = item;
  else array.push(item);
}

exports.addGoogle = async (req, res)=>{
    const { token } = req.body;
    const ticket = await client.verifyIdToken({
      idToken: token,
      // Specify the CLIENT_ID of the app that accesses the backend
      audience: "114914030611-askhm7c3r7pnhp8b7rq87qbvt8ncb2sb.apps.googleusercontent.com",
    });
  
    //getting the payload from the ticket
    const { name, email} = ticket.getPayload();
    //creating the user object
    upsert(users, { name, email });
    //sending the response
    res.status(201);
    //sending the response to frontend
    res.json({ name, email });
}