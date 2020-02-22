let app = require('express')();
let http = require('http').Server(app);
let io = require('socket.io')(http);
const {URLSearchParams} = require('url')
const fetch = require('node-fetch')
let config = require("./config")

let access = ""
app.get('/', function(req, res) {
   res.sendfile('index.html');
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
