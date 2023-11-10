const ProductService = require('../services/ProductService')

const createProduct = async (req, res) => {
    try {
        const {name, description, new_price, old_price, image, type, countInStock, rating, discount, selled} = req.body

        console.log('req.body', req.body)

        if (!name || !description || !new_price || !old_price || !image || !type || !countInStock || !rating || !discount || !selled) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The input is required'
            })
        }
        
        const response = await ProductService.createProduct(req.body)
        console.log('response', response)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({ 
            message: e
        })
    }
}

const updateProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        const data = req.body;
        if(!productId){
            return res.status(200).json({
                status: 'ERR',
                message: 'The input is required'
            })
        }
        console.log('userId', productId)
        const response = await ProductService.updateProduct(productId, data)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({ 
            message: e
        })
    }
}

const getDetailsProduct= async (req, res) => {
    try {
        const productId = req.params.id;

        if(!productId){
            return res.status(200).json({
                status: 'ERR',
                message: 'The input is required'
            })
        }

        const response = await ProductService.getDetailsProduct(productId)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({ 
            message: e
        })
    }
}

const deleteProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        if(!productId){
            return res.status(200).json({
                status: 'ERR',
                message: 'The input is required'
            })
        }
        console.log('productId', productId)
        const response = await ProductService.deleteProduct(productId)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({ 
            message: e
        })
    }
}

const getAllProduct = async (req, res) => {
    try {
        const {limitProduct, page, sort,filter}  = req.query
        const response = await ProductService.getAllProduct(Number(limitProduct) || 8, Number(page) || 0, sort,filter)  
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({ 
            message: e
        })
    }
}

module.exports = {
    createProduct,
    updateProduct,
    getDetailsProduct,
    deleteProduct,
    getAllProduct
}