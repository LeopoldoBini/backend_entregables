import fs from 'fs';

const mensajes =  JSON.parse(fs.readFileSync('./mensajes.json', 'utf-8'));

mensajes.forEach(mensaje => {
    let a =Date.now()
    let n = 1000000000 * Math.random();
  mensaje.timestamp = new Date(a-n).toLocaleString();
});

const response = fs.writeFileSync('./mensajes.json', JSON.stringify(mensajes));