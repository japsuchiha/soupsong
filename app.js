let app = require('express')();
let express = require('express')
let http = require('http').Server(app);
let io = require('socket.io')(http);
let config = require("./config")
let fs = require('fs')
let bodyParser = require("body-parser")
var session = require('express-session')
const {URLSearchParams} = require('url')
const fetch = require('node-fetch')
const MAX_TOKEN = 5;
const NEW_USER_WAIT = 1000 * 60 * 10;
const REGENERATE_TOKEN_S = 60 * 30;
app.use(express.static("./public"))
app.use(session({
   'secret': 'someggkeythisis'
 }))
 app.use(bodyParser.urlencoded({ extended: false }));
 app.use(bodyParser.json()); 
let access = ""
app.post('/create', (req,res) => {
   let html = req.body.html
   let user = req.body.user
   fs.writeFile(`./public/out.html`, html, (err) => console.log(err))
   console.log(html)
})
app.get('/skip/', function(req, res) {
   var d = new Date();
   if (req.session.date)
   {
      if (d.getTime() - req.session.date < NEW_USER_WAIT)
      {
         res.send('Please wait for ' + Math.round((NEW_USER_WAIT/1000) - (d.getTime() - req.session.date)/1000) + 's');
      }
      else
      {
         var toBeAdded = (((d.getTime() - req.session.lastRefil)/1000)/REGENERATE_TOKEN_S).toFixed(2);
         req.session.skips = Math.min(MAX_TOKEN, req.session.skips + parseFloat(toBeAdded));
         // console.log(req.session.skips);
         req.session.lastRefil = d.getTime();
         if (req.session.skips >= 1)
         {
            req.session.skips--;
            res.status(200).send("OK");
         }
         else
         {
            res.status(429).send('Too many requests bhai')
         }
      }
   }
   else
   {
      req.session.date = d.getTime();
      req.session.skips = MAX_TOKEN;
      req.session.lastRefil = d.getTime();
      //Max age 03-24-2020 00:00:00
      req.session.cookie.expires = 1585022400000;
      res.send('Wait ' + NEW_USER_WAIT/60000 + ' mins');
   }
});

app.get('/main.css', function(req, res) {
   res.sendFile(__dirname + "/" + "main.css");
 });

app.get('/refresh', (req,res) => {
   const params = new URLSearchParams();
   const header = new URLSearchParams();
   console.log(config.auth)
   header.append("Authorization", config.auth)
   params.append("grant_type", "refresh_token")
   params.append("refresh_token", config.refresh)
   fetch("https://accounts.spotify.com/api/token", {method: 'POST', body: params, headers:header})
   .then(res => res.json())
   .then((json) => {access = json.access_token; console.log(access)})
});

users = [];
io.on('connection', function(socket) {
   console.log('A user connected');
   socket.on('setUsername', function(data) {
      console.log(data);
      
      if(users.indexOf(data) > -1) {
         socket.emit('userExists', data + ' username is taken! Try some other username.');
      } else {
         users.push(data);
         socket.emit('userSet', {username: data});
      }
   });
   
   socket.on('msg', function(data) {
      //Send message to everyone
      io.sockets.emit('newmsg', data);
   })
});

http.listen(3000, function() {
   console.log('listening on localhost:3000');
});
