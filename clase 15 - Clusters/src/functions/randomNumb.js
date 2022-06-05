export const randomNumb = ( cantidad = 100000000) => {

    const obj = {}

    for (let i = 0; i < cantidad ; i++) {
        const numero = Math.floor(Math.random() * 1000);
        numero in obj ? obj[numero]++ : obj[numero] = 1;
    }
    return obj;
}


process.on("message", (cantidad) => {
    const obj = randomNumb(cantidad);
    process.send(obj);
})