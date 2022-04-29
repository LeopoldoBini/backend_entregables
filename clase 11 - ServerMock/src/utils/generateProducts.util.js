import faker from '@faker-js/faker';

export const generateProducts = (n) => {
    const products = [];
    for (let i = 0; i < n; i++) {
        products.push({
            title: faker.commerce.productName(),
            price: faker.commerce.price(),
            thumbnail: faker.image.imageUrl(),
        });
    }
    return products;
    }

