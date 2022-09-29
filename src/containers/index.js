class Containter {
    constructor(){
        this.productos = []
    }

    save(producto){
        try {
            producto.id = this.productos.length + 1
            this.productos.push(producto)
            return producto
        } catch(error){
            return error
        }
    }

    getAll(){
        return this.productos
    }

    getById(id){
        try {
            const result = this.getAll().find(obj => obj.id == id) 
            return result === undefined ? ({error: 'producto no encontrado'}) : result
        } catch(error){
            return error
        }
    }

    modifById(id, producto){
        try {
            producto.id = id
            this.getAll().splice(id-1, 1, producto)
            return this.getById(id)
        } catch(error){
            return error
        } 
    }

    deleteById(id){
        try {
            this.productos = this.getAll().filter(obj => obj.id !== id)
            return {msg: `Producto con el id ${id} eliminado`}
        } catch(error){
            return error
        } 
    }
}


module.exports = Containter