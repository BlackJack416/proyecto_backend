class ProductDTO {
    constructor(name, seller, brand, category, description, countInStock, rating, numReviews, reviews, price, image) {
        this.name = name;
        this.seller= seller;
        this.brand = brand;
        this.category = category;
        this.description = description;
        this.countInStock = countInStock;
        this.rating = rating;
        this.numReviews = numReviews;
        this.reviews = reviews;
        this.price = price;
        this.image = image;
    }
}

module.exports = ProductDTO;