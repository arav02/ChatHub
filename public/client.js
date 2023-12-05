const socket = io()

let username;
let textarea = document.querySelector('#textarea')
let messageArea = document.querySelector('.message_area')
do{
    username = prompt('Please enter your name: ')

} while(!username)

textarea.addEventListener('keyup',(e) => {
    if(e.key === 'Enter') {
        sendMesssage(e.target.value)
    }
})

function sendMesssage(message) {
    let msg = {
        user: username,
        message: message.trim()
    }

    if(msg.message != ''){
        //append
         appendMessage(msg,'outgoing')
    }
    //clear text area field
    textarea.value = '';
    //scroll to bottom
    scrollToBottom();

    //send to server
    socket.emit('message',msg)
}

function appendMessage(msg,type){
    let mainDiv = document.createElement('div')
    let className = type
    mainDiv.classList.add(className,'message');

    let markup = `
    <h4>${msg.user}</h4>
    <p>${msg.message}</p> 
    `;
    mainDiv.innerHTML = markup;
    messageArea.appendChild(mainDiv);

}

//Recieve message

socket.on('message', (msg) => {
    if(msg.message != ''){
        appendMessage(msg,'incoming');
    }
      scrollToBottom();
})


function scrollToBottom(){
    messageArea.scrollTop = messageArea.scrollHeight;
}

