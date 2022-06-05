const socket = io();
const titulo = document.getElementById("titulo");
const [inputNick, inputNombre , inputApellido, inputEmail, inputEdad, inputMsg] = document.getElementsByClassName("inp");
const inputMessagesArr = document.getElementsByClassName("inp")
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

/* const renderProducts = (productList) => {
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
}; */





btnSend.addEventListener("click", async (e) => {
  e.preventDefault();
  const nickname = inputNick.value 
  const nombre = inputNombre.value 
  const apellido = inputApellido.value 
  const id = inputEmail.value 
  const edad = inputEdad.value 
  console.log("jo");
  
  for ( let i=0 ; i < inputMessagesArr.length ; i++) { 
    if (inputMessagesArr[i].value === "") {
      alertaChat.innerHTML = "Todos los campos son obligatorios";
      setTimeout(() => {
        alertaChat.innerText = ""
      }, 3000)
      return;
    }
  
  }

  const mensaje = inputMsg.value;
  if (mensaje) {
    const timestamp = new Date().toLocaleString();
    const newMsg = {
        author: {
            id,
            nombre,
            apellido,
            edad,
            alias : nickname,
            avatar: ""
        },
        text: mensaje,
        timestamp
      }
    socket.emit("inputChatCliente",newMsg);
    inputMsg.value = "";
  }
});


/* const addingProd = (e) => {

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

}; */
//btnAddProd.addEventListener('click' , addingProd)


const { normalize, schema, denormalize } = normalizr;
const denormalizeMensajes = (mensajesNormalizados) => {
  const authorSchema = new schema.Entity("authors");
  const messageSchema = new schema.Entity("messages", {
      author : authorSchema   });
  const messageListSchema = new schema.Array(messageSchema);
  const mensajesDenormalizados = denormalize(mensajesNormalizados.result, messageListSchema, mensajesNormalizados.entities);
  return mensajesDenormalizados;
}

socket.on("connect", () => {
  idSocket = socket.id;
  titulo.innerText = idSocket;
});

socket.on("todosLosMensajes", (data) => {
  
  const mensajesDenormalizados = denormalizeMensajes(data);
  
  const normSize = JSON.stringify(data).length;
  const denormSize = JSON.stringify(mensajesDenormalizados).length;
  const sizeDiffPercent = (normSize - denormSize) / normSize * 100;
  document.getElementById("percentage").innerText = `Porcentaje de reducción: ${sizeDiffPercent.toFixed(2)}%`;

  todosLosMensajes = "";
  mensajesDenormalizados.forEach((mensaje) => {
    todosLosMensajes += `
        <li class="msg">
        <img class="avatar" src="${mensaje.author.avatar}" alt="avatar">
           <em class="msgNickname">${mensaje.author.alias}</em>
           <span class="msgTimestamp">[${mensaje.timestamp}]: </span>
           ${mensaje.text} 
           
        </li>
        `;
  });
  msgList.innerHTML = todosLosMensajes;
});

/* socket.on("todosLosProductos", ({ productos, idProductoAgregado }) => {
  todosLosProductos = "";
  renderProducts(productos);
  alertAddProd.innerText = `Producto agragado con exito, id: ${idProductoAgregado}`
}); */


