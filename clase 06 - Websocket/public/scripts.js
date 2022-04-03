const socket = io();
const titulo = document.getElementById("titulo");
const [inputNick, inputMsg] = document.getElementsByClassName("inp");
const inpProd = document.getElementsByClassName("inpProd");
const btnSend = document.getElementById("btnSend");
const btnAddProd = document.getElementById("btnAddProd")
const alertAddProd = document.getElementById("alertAddProd")
const alertaChat = document.getElementById("alertaChat")
const tableBody = document.getElementById("tableBody");
const msgList = document.getElementById("messageList");
let idSocket = "";
let todosLosMensajes = "";
let todosLosProductos = "";

const renderProducts = (productList) => {
  todosLosProductos = "";
  console.log(productList, 'este viene de la formula renderProd')
  productList.forEach((producto) => {
    todosLosProductos += `
          <tr>
              <td>${producto.title}</td>
              <td>${producto.price}</td>
              <td><img src="${producto.thumbnail}" alt="${producto.title}"></td>
        </tr>
          `;
  });
  tableBody.innerHTML = todosLosProductos;
}
const addMsg = () => {
  const nickname = inputNick.value;
  if (!nickname) {
    alertaChat.innerText = "Por favor, indicá tu Nickname"
    setTimeout(() => {
      alertaChat.innerText = ""
    }, 3000)
    return
  }
  const mensaje = inputMsg.value;
  if (mensaje) {
    const timeStamp = new Date().toLocaleString();
    socket.emit("inputChatCliente", {
      mensaje,
      idSocket,
      nickname,
      timeStamp,
    });
    inputMsg.value = "";
  }
};

const addingProd = (e) => {

  const areThereAllvalues = Array.from(inpProd).reduce((prev, curr) => {
    return prev && !!curr.value
  }, true)
  if (areThereAllvalues) {
    const urlencoded = new URLSearchParams();
    urlencoded.append("title", inpProd.title.value);
    urlencoded.append("price", inpProd.price.value);
    urlencoded.append("thumbnail", inpProd.thumbnail.value);

    const requestOptions = {
      method: 'POST',
      headers: new Headers(),
      body: urlencoded,
      redirect: 'follow'
    };

    fetch("http://localhost:1000/", requestOptions)
      .then(response => response.json())
      .then(result => {
        socket.emit("productAdded", { idSocket });
        console.log(result)
      })
      .then(() => {
        Array.from(inpProd).forEach((input) => {
          input.value = "";
        })
      })
      .catch(error => console.log('error', error));
    console.log("producto mandado");
  } else {
    alertAddProd.innerText = 'Se necesitan todos los campos'
  }

};
//btnAddProd.addEventListener('click' , addingProd)



socket.on("connect", () => {
  idSocket = socket.id;
  titulo.innerText = idSocket;
});

socket.on("todosLosMensajes", (data) => {
  todosLosMensajes = "";
  data.forEach((mensaje) => {
    todosLosMensajes += `
        <li class="msg">
           <em class="msgNickname">${mensaje.nickname}</em>
           <span class="msgTimestamp">[${mensaje.timeStamp}]: </span>
           ${mensaje.mensaje} 
        </li>
        `;
  });
  msgList.innerHTML = todosLosMensajes;
});

socket.on("todosLosProductos", ({ productos, idProductoAgregado }) => {
  todosLosProductos = "";
  renderProducts(productos);
  alertAddProd.innerText = `Producto agragado con exito, id: ${idProductoAgregado}`
});




