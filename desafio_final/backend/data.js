
import bcrypt from 'bcryptjs';

const data = {
    users: [
        {
            name: 'Carlos',
            password: bcrypt.hashSync('1234', 8),
            isAdmin: true,
            isSeller: true,
            seller: {
                name: 'Vans',
                logo: '/images/vans_001.jpeg',
                description: 'best seller',
                rating: 4.5,
                numReviews: 120,
            },
        },
        {
            name: 'Juan',
            password: bcrypt.hashSync('1234', 8),
            isAdmin: false,
            isSeller: true,
        },
        {
            name: 'Manuel',
            password: bcrypt.hashSync('1234', 8),
            isAdmin: false,
            isSeller: false,
        },
    ],
    products: [
        {
            name: 'Vans Old Skool',
            category: 'Sneakers',
            image: '/images/vans_001.jpeg',
            price: 120,
            countInStock: 15,
            brand: 'Vans',
            rating: 4.5,
            numReviews: 10,
            description: 'high quality product',
        },
        {
            name: 'Nike Air Max Furyosa',
            category: 'Sneakers',
            image: '/images/nike_001.jpeg',
            price: 100,
            countInStock: 15,
            brand: 'Adidas',
            rating: 4.0,
            numReviews: 10,
            description: 'high quality product',
        },
        {
            name: 'Nike Air Force 1 07 Se',
            category: 'Sneakers',
            image: '/images/nike_002.jpeg',
            price: 220,
            countInStock: 15,
            brand: 'Nike',
            rating: 4.8,
            numReviews: 17,
            description: 'high quality product',
        },
        {
            name: 'Nike Air Huarache',
            category: 'Sneakers',
            image: '/images/nike_003.jpeg',
            price: 78,
            countInStock: 15,
            brand: 'Nike',
            rating: 4.5,
            numReviews: 14,
            description: 'high quality product',
        },
        {
            name: 'Nike Waffle One Se',
            category: 'Sneakers',
            image: '/images/nike_004.jpeg',
            price: 65,
            countInStock: 15,
            brand: 'Nike',
            rating: 4.5,
            numReviews: 10,
            description: 'high quality product',
        },
        {
            name: 'adidas Multix',
            category: 'Sneakers',
            image: '/images/adidas_001.jpeg',
            price: 139,
            countInStock: 15,
            brand: 'Adidas',
            rating: 4.5,
            numReviews: 15,
            description: 'high quality product',
        },
        {
            name: 'Nike Air Max Pre-Day Se',
            category: 'Sneakers',
            image: '/images/nike_005.jpeg',
            price: 65,
            countInStock: 15,
            brand: 'Nike',
            rating: 4.5,
            numReviews: 10,
            description: 'high quality product',
        },
        {
            name: 'Nike Air Huarache Se',
            category: 'Sneakers',
            image: '/images/nike_006.jpeg',
            price: 65,
            countInStock: 15,
            brand: 'Nike',
            rating: 4.5,
            numReviews: 10,
            description: 'high quality product',
        },

    ],
};
export default data;