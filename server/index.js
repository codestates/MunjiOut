require('dotenv').config();
const fs = require('fs');
const https = require('https');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const express = require('express');
const app = express();

const controllers = require('./controllers');
const { findOne } = require('./controllers/search/search');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
    cors({
      origin: ["https://localhost:3000"],
      credentials: true,
      methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
    })
  );
  
app.use(cookieParser());

app.get('/auth', controllers.auth);
app.post('/signup', controllers.signup);
app.post('/login', controllers.login);
app.post('/logout', controllers.logout);
app.get('/search', findOne);
app.post('/email', controllers.email);
app.post('/mainpage', controllers.mainpage);
app.get("/userinfo", controllers.userinfo);
app.post("/editUserinfo", controllers.editUserinfo);
app.post("/withdrawal", controllers.withdrawal);

const HTTPS_PORT = process.env.HTTPS_PORT || 4000;

let server;

if (fs.existsSync('./key.pem') && fs.existsSync('./cert.pem')) {
  const privateKey = fs.readFileSync(__dirname + '/key.pem', 'utf8');
  const certificate = fs.readFileSync(__dirname + '/cert.pem', 'utf8');
  const credentials = { key: privateKey, cert: certificate };

  server = https.createServer(credentials, app);
  server.listen(HTTPS_PORT, () => console.log('https server runnning'));
} else {
  server = app.listen(HTTPS_PORT, () => console.log('http server runnning'));
}

module.exports = server;