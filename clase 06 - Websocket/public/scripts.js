const socket = io()
const titulo = document.getElementById('titulo')
const [inputNick , inputMsg] = document.getElementsByClassName('inp')
const inpProd = document.getElementsByClassName('inpProd')
const btnSend = document.getElementById('btnSend')
const tableBody = document.getElementById('tableBody')
const msgList = document.getElementById('messageList')
let idSocket = ''
let todosLosMensajes = ''
let todosLosProductos = ''

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
const addingProd = () => {
    socket.emit('productAdded')
    console.log('producto mandado')
    //inpProd.forEach(input => {input.value = ""})
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
socket.on('todosLosProductos', ()=>{
    todosLosProductos =""
    data.forEach(producto => {
        todosLosProductos+= `
        <tr>
            <td>${producto.title}</td>
            <td>${producto.price}</td>
            <td><img src="${producto.thumbnail}" alt="${producto.title}"></td>
      </tr>
        `
    });
    tableBody.innerHTML = todosLosProductos
})

const btnPrueba = document.getElementById('pruebaFetch')

btnPrueba.addEventListener('click', ()=> {
    fetch("http://localhost:1000/fetchProductos").then(res => res.json()).then(res => console.log(res))
})