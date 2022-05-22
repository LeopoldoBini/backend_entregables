import faker from '@faker-js/faker'
faker.locale = 'es';
import ContenedorMensajes from '../containers/messages.container.js';

export const generateMessages = (n = 10) => {
    let messages = [];
    for (let i = 0; i < n; i++) {
        const nombre = faker.name.firstName();
        const apellido = faker.name.lastName();
        const id = faker.internet.email(nombre, apellido);
        const edad = faker.datatype.number({ min: 18, max: 60 });
        const alias = faker.internet.userName(nombre, apellido);
        const avatar = faker.internet.avatar();
        messages.push({
            author: {
                id,
                nombre,
                apellido,
                edad,
                alias,
                avatar
            },
            text: faker.lorem.sentence()
        });
    }
    return messages;
}
const foo = new ContenedorMensajes("mensajes");
for (let i = 0; i < 10; i++) {
    foo.save(generateMessages(1)[0]);
}
