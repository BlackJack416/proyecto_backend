const { Router } = require ('express')
const routerProduct = Router();
const Containter = require('../containers/index')

const ProductContain = new Containter()

routerProduct.get('/', (req, res) => {
    res.json(ProductContain.getAll())
})

routerProduct.get('/:id', (req, res) => {
    const num = parseInt(req.params.id)
    res.json(ProductContain.getById(num))
})

routerProduct.post('/', (req, res) => {
    const product = req.body
    res.json(ProductContain.save(product))
})

routerProduct.put('/:id', (req, res) => {
    const num = parseInt(req.params.id)
    const product = req.body
    res.json(ProductContain.modifById(num, product))
})

routerProduct.delete('/:id', (req, res) => {
    const num = parseInt(req.params.id)
    res.json(ProductContain.deleteById(num))
})


module.exports = routerProduct