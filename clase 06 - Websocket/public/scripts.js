const socket = io();
const titulo = document.getElementById("titulo");
const [inputNick, inputMsg] = document.getElementsByClassName("inp");
const inpProd = document.getElementsByClassName("inpProd");
const btnSend = document.getElementById("btnSend");
const btnAddProd = document.getElementById("btnAddProd")
const tableBody = document.getElementById("tableBody");
const msgList = document.getElementById("messageList");
let idSocket = "";
let todosLosMensajes = "";
let todosLosProductos = "";

const renderProducts = (productList , msg) => {
    todosLosProductos = "";
    productList.forEach((producto) => {
      todosLosProductos += `
          <tr>
              <td>${producto.title.value}</td>
              <td>${producto.price.value}</td>
              <td><img src="${producto.thumbnail.value}" alt="${producto.title.value}"></td>
        </tr>
          `;
    });
    tableBody.innerHTML = todosLosProductos;
    if (msg) document.getElementById('mensajeAddProd').innerText = msg
  }
const addMsg = () => {
  const mensaje = inputMsg.value;
  const nickname = inputNick.value;
  const timeStamp = new Date().toLocaleString();
  socket.emit("inputChatCliente", {
    mensaje,
    idSocket,
    nickname,
    timeStamp,
  });
  inputMsg.value = "";
};

const addingProd = (e) => {
    e.preventDefault()
  const urlencoded = new URLSearchParams();
  urlencoded.append("title", inpProd.title);
  urlencoded.append("price", inpProd.price);
  urlencoded.append("thumbnail", inpProd.thumbnail);

  const requestOptions = {
    method: "POST",
    headers: new Headers(),
    body: urlencoded,
    redirect: "follow",
  };

  fetch("http://localhost:1000/", requestOptions)
    .then((response) => response.json())
    .then((json) => {
        id in json 
        ? renderProducts(json.productos , json.mensaje) 
        : (function () {
            document.getElementById('mensajeAddProd').innerText = json.mensaje
        })()
    })
    .catch((error) => console.log("error", error));

    socket.emit("productAdded" , {idSocket});
    console.log("producto mandado");
    inpProd.forEach((input) => {
    input.value = "";
  });
};
btnAddProd.addEventListener('click' , addingProd)



socket.on("connect", () => {
  idSocket = socket.id;
  titulo.innerText = idSocket;
});

socket.on("MensajeConexion", (data) => {
  socket.emit(
    "MensajeDesdeClienteAlConectarse",
    "Eee graciela por dejarme pasar pues!"
  );
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

socket.on("todosLosProductos", ({productos, sktId}) => {
    if (sktId != idSocket){
        todosLosProductos = "";
        renderProducts(productos);
    }
  });



//  fetch("http://localhost:1000/fetchProductos").then(res => res.json()).then(res => console.log(res))
