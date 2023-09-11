const functions = require("firebase-functions");
const express = require("express");

const admin = require("firebase-admin");
const serviceAccount = require("./permissions.json");

const app = express();
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

app.get("/hello-world", (req, res) => {
  return res.status(200).json({message: "Hello World!"});
});

app.use(require("./routes/products.routes"));

exports.app = functions.https.onRequest(app);

/* const {onRequest} = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger"); */
