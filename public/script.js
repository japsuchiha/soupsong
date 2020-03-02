let io = require('socket.io-client')
let fsa = require('browserify-fs')
let socket = io();
document.querySelector('.but').addEventListener('click', setUsername)
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
    let html_con = '<input type = "text" id = "message">\
    <button type = "button" name = "button" onclick = "sendMessage()">Send</button>\
    <div id = "message-container"></div>';
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
function sendMessage() {
    let msg = document.getElementById('message').value;
    if(msg) {
    socket.emit('msg', {message: msg, user: user});
    }
}
socket.on('newmsg', function(data) {
    if(user) {
    document.getElementById('message-container').innerHTML += '<div><b>' + 
        data.user + '</b> ' + "requested " + data.message + '</div>'
    }
})