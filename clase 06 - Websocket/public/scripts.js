const socket = io()
const titulo = document.getElementById('titulo')
const [inputNick , inputMsg] = document.getElementsByClassName('inp')
const btnSend = document.getElementById('btnSend')
const msgList = document.getElementById('messageList')
let idSocket = ''
let todosLosMensajes = ''


/* btnSend.addEventListener('click', () => {
    const mensaje = inputMsg.value
    const nickname = inputNick.value
    const timeStamp = (new Date()).toLocaleString()

    socket.emit('inputChatCliente' , {
        mensaje,
        idSocket,
        nickname,
        timeStamp
    }
    )
    inputMsg.value = ""
}) */
const addMsg = ()=>{
    const mensaje = inputMsg.value
    const nickname = inputNick.value
    const timeStamp = (new Date()).toLocaleString()
    console.log('anda la func')
    socket.emit('inputChatCliente' , {
        mensaje,
        idSocket,
        nickname,
        timeStamp
    }
    )
    inputMsg.value = ""
}

socket.on('connect' , () => {
    console.log(socket, titulo)
    idSocket = socket.id
    titulo.innerText = idSocket


})

socket.on('MensajeConexion', data =>{
    console.log(data)
    socket.emit('MensajeDesdeClienteAlConectarse' , 'Eee graciela por dejarme pasar pues!')
})


socket.on('todosLosMensajes', data=> {
    console.log('Estos son todos los Mensajes =>' , data)
    todosLosMensajes =""
    data.forEach(mensaje => {
        todosLosMensajes+= `
        <li class="msg">
           <em class="msgNickname">${mensaje.nickname}</em>
           <span class="msgTimestamp">[${mensaje.timeStamp}]: </span>
           ${mensaje.mensaje} 
        </li>
        `
    });
    msgList.innerHTML = todosLosMensajes

})