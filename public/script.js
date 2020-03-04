let io = require('socket.io-client')
let socket = io();
let but = document.querySelector('.but')
if(but) {
    document.querySelector('.but').addEventListener('click', setUsername)
}
function setUsername() {
    console.log("sup")
    socket.emit('setUsername', document.getElementById('name').value);
};
let user;
socket.on('userExists', function(data) {
    document.getElementById('error-container').innerHTML = data;
});
socket.on('userSet', function(data) {
    console.log("het")
    user = data.username;
    let html_con = `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <link rel="stylesheet" type="text/css" href="./out.css">
        <title>Document</title>
    </head>
    <body>
        <input type = "text" id = "message">
        <button type = "button" name = "button" onclick = "sendMessage()">Send</button>
        <div id = "message-container"></div>
    </body>
    <script src = "./bundle.js"></script>
    <script src = "./api.js"></script>
    </html>`;
    fetch("http://localhost:3000/create", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'mode': 'no-cors'
        },
        body: JSON.stringify({
            html: html_con,
            user: user
        })
    })
    .then((resp) => resp.json())
    .then((data) => console.log(data))
});
document.querySelector('.bou').addEventListener('click', sendMessage)
console.log(document.querySelector(".bou"))
// document.querySelector(".bou").addEventListener('click', () => {
//     console.log("heyao")
// })
function sendMessage() {
    console.log("sup")
    let msg = document.getElementById('message').value;
    console.log(msg)
    if(msg) {
    socket.emit('msg', {message: msg, user: user});
    }
}
socket.on('newmsg', function(data) {
    console.log("youa")
    console.log(data)
    if(user) {
    console.log("usera")
    document.getElementById('message-container').innerHTML += '<div><b>' + 
        data.user + '</b> ' + "requested " + data.message + '</div>'
    }
})