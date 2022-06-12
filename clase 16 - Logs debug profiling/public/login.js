const loginBtn = document.getElementById('logginbtn'); 
const logoutBtn = document.getElementById('logoutbtn');
const inpLogNombre = document.getElementById('lognombre');


/* loginBtn.addEventListener('click',(e) => {
    e.preventDefault();
    const nombre = document.getElementById('lognombre').value; 
    if (!nombre) {
        alert('Por favor ingrese un nombre');
        return;
    }
    const urlencoded = new URLSearchParams()
    urlencoded.append("nombre", nombre)
    const requestOptions = {
      method: 'POST',
      headers: new Headers(),
      body: urlencoded,
      redirect: 'follow'
    };
    fetch('/login', requestOptions);
    
}) */

/* logoutBtn.addEventListener('click', async (e) => {
    e.preventDefault();
    console.log('logout');
    fetch('/logout', {method: "GET" , redirect: 'follow'});
}) */

/* logginbtn.addEventListener("click", async (e) => {
  e.preventDefault();
  const nombre = document.getElementById("lognombre").value;
  if (!nombre) {
    document.getElementById("alertlog").innerText = "Por favor ingrese un nombre";
    return
  }

  const urlencoded = new URLSearchParams()
  urlencoded.append("nombre", nombre)
  const requestOptions = {
    method: 'POST',
    headers: new Headers(),
    body: urlencoded,
    redirect: 'follow'
  };
  fetch("http://localhost:8080/login", requestOptions)
}) */