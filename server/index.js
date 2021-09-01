require("dotenv").config();
const fs = require("fs");
const https = require("https");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const express = require("express");
const app = express();

const controllers = require("./controllers");
const { findOne } = require("./controllers/search/search");
const { sendEmail } = require("./functions/emailNotification");
const { sendEmailTest } = require("./functions/emailNotificationTest");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: true,
    // httpOnly: true,
    credentials: true,
    methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
  })
);

app.use(cookieParser());

app.get("/auth", controllers.auth);
app.get("/accesstokenrequest", controllers.accessTokenRequest);
app.get("/refreshtokenrequest", controllers.refreshTokenRequest);
app.post("/signup", controllers.signup);
app.post("/login", controllers.login);
app.post("/logout", controllers.logout);
app.get("/search", findOne);
// app.get("/email", controllers.email);
app.get("/mainpage", controllers.mainpage);
app.get("/userinfo", controllers.userinfo);
app.post("/editUserinfo", controllers.editUserinfo);
app.post("/withdrawal", controllers.withdrawal);
app.post("/setLocation", controllers.setLocations);
app.post("/unsetLocation", controllers.unsetLocations);
app.get("/userLocation", controllers.userLocations);

const HTTPS_PORT = process.env.HTTPS_PORT || 4000;

let server;

server = app.listen(HTTPS_PORT, () => console.log("http server running"));

// if (fs.existsSync("./key.pem") && fs.existsSync("./cert.pem")) {
//   const privateKey = fs.readFileSync(__dirname + "/key.pem", "utf8");
//   const certificate = fs.readFileSync(__dirname + "/cert.pem", "utf8");
//   const credentials = { key: privateKey, cert: certificate };

//   server = https.createServer(credentials, app);
//   server.listen(HTTPS_PORT, () => console.log("https server running"));
// } else {
//   server = app.listen(HTTPS_PORT, () => console.log("http server running"));
// }

// email notification
// sendEmail();

// for testing
// sendEmailTest();

module.exports = server;
