import faker from '@faker-js/faker';

export const generateProducts = (n) => {
    const products = [];
    for (let i = 0; i < n; i++) {
        const title = faker.commerce.productName();
        const price = faker.commerce.price();
        const thumbnail = faker.image.business();
        const prod ={ title, price, thumbnail };
        products.push( prod );
        
    }
    return products;
    }

