const socket = io('http://localhost:4000');
const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageinput');
const messageContainer = document.querySelector(".container");
var audio = new Audio('chattone.mp3')
const names = prompt("Enter your Name to join the chat");
const append = (message,position)=>{
    const messageElement = document.createElement('div')
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement)
    if(position == "left"){
    audio.play();
    }
}
form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const message = messageInput.value;
    append(`You: ${message}`,'right')
    socket.emit('send',message);
    messageInput.value='';
})
socket.emit('new-user-joined',names)
socket.on('user-joined',person=>{
    if (person!==null)
        append(`${person} joined the chat `,'right')
})
socket.on('receive',data=>{
    append(`${data.name}:${data.message}`,'left')
})
socket.on('quit',quitter=>{
    if(quitter!==null )
        append(`${quitter} left the chat`,'right')
})

