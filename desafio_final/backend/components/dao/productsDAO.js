import ProductDTO from "../dto/productsDTO";
let instance = null;

class productsContainer {

    async save() {
        try {
            const products = [];
            for (let i = 0; i < 10; i++) {
                const product = new ProductDTO(
                    console.log('not implemented')
                );
                products.push(product);
            }
            return products;
        } catch (e) {
            console.log(e)
        }
    }

    async getById(id) {
        return await this.schema.find({ _id: id }).lean();
    }

    async getAll() {
        return await this.schema.find({}).lean();
    }

    async deleteById(id) {
        await this.schema.deleteOne({ _id: id });
    }
    async deleteAll() {
        await this.schema.deleteMany({});
    }

    async update(id, obj) {
        return await this.schema.updateOne(
            { _id: id },
            { $set: { products: obj } }
        );
    }

    static getInstance() {
        if (!instance) {
            instance = new productsContainer();
        }
        return instance;
    }
}

module.exports = productsContainer;