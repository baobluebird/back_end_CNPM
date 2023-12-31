const Product = require('../models/ProductModel');
const dotenv = require('dotenv');
dotenv.config();


const createProduct = async (newProduct) => {

    const {name, guarantee, new_price, old_price, image, type, countInStock, total_rate, discount, sold} = newProduct;
    const {name_description, product_code, product_type, connection, switch_type, durability, format} = newProduct;
        try{
            const checkProduct = await Product.findOne({name:name});
            if(checkProduct){
                resolve({
                    status: 'error',
                    message: 'Name already exists'
                })
            }

            await Product.create({
                name, 
                description:{
                    name_description, 
                    product_code, 
                    product_type, 
                    connection, 
                    switch_type, 
                    durability, 
                    format
                }, 
                guarantee,
                new_price, 
                old_price, 
                image, 
                type, 
                countInStock: Number(countInStock), 
                total_rate, 
                discount: Number(discount),
                sold
            })

        }catch(error){
           return error
        }
}


const updateProduct = async (id,data) => {
    try{
        await Product.findByIdAndUpdate(id,data, {new: true})
    }catch(error){
        return error
    }
}

const deleteProduct = async (id) => {
    try{
     await Product.findByIdAndDelete(id)
    }
    catch(error){
        return error
    }
}

const getAllProduct = (sortName, sortType, searchName, type, brand) => {
    return new Promise(async (resolve, reject) => {
        try {
            let allProduct;
            if (searchName) {
                const regex = new RegExp(searchName, 'i');
                allProduct = await Product.find({
                    $or: [
                        { name: { $regex: regex } },
                        { description: { $regex: regex } },
                        { type	: { $regex: regex } },
                    ]
                });
            }
            else if (type) {
                const regex = new RegExp(type, 'i');
                allProduct = await Product.find({
                    $or: [
                        { name: { $regex: regex } },
                        { description: { $regex: regex } },
                        { type	: { $regex: regex } },
                    ]
                });
            }else if(brand){
                const regex = new RegExp(brand, 'i');
                const objectSort = { [sortName]: sortType };
                allProduct = await Product.find({
                    $or: [
                        { name: { $regex: regex } },
                        { description: { $regex: regex } },
                        { type	: { $regex: regex } },
                    ]
                }).sort(objectSort);
            }
            else if (sortName && sortType) {
                const objectSort = { [sortName]: sortType };
                allProduct = await Product.find().sort(objectSort);
            } else {
                allProduct = await Product.find().sort({ createdAt: -1, updatedAt: -1 });
            }

            resolve(allProduct);
        } catch (error) {
            reject(error);
        }
    });
};

const getDetailsProduct = (id) => {
    return new Promise(async (resolve, reject) => {
        try{
            const product = await Product.findOne({
                _id: id
            })

            if(product == null){
                resolve({
                    status: 'error',
                    message: 'The user is not exist'
                })
            }

            resolve(product)
        }catch(error){
            reject(error) 
        }
    })
}

const sortProduct = async (sort, filter) => {
    try {
        const totalProduct = await Product.countDocuments();
        let allProduct;

        if (filter) {
            const label = filter[0];
            let filterValue;

            if (['new_price', 'old_price', 'countInStock', 'total_rate', 'selled'].includes(label)) {
                filterValue = parseInt(filter[1]);
            }

            const filterQuery = filterValue
                ? { [label]: filterValue }
                : { [label]: { '$regex': filter[1] } };

            allProduct = await Product.find(filterQuery).sort({ createdAt: -1, updatedAt: -1 });
        } else if (sort) {
            const objectSort = { [sort[1]]: sort[0] };
            allProduct = await Product.find().sort(objectSort);
        } else if (!limit) {
            allProduct = await Product.find().sort({ createdAt: -1, updatedAt: -1 });
        } else {
            allProduct = await Product.find().sort({ createdAt: -1, updatedAt: -1 });
        }

        return {
            status: 'success',
            message: 'Successfully get all product',
            data: allProduct,
            total: totalProduct,
        };
    } catch (e) {
        throw e;
    }
};

const getRatingProduct = (id) => {
    return new Promise(async (resolve, reject) => {
        try{
            const product = await Product.findOne({
                _id: id
            })

            if(product == null){
                resolve({
                    status: 'error',
                    message: 'The user is not exist'
                })
            }

            resolve(product)
        }catch(error){
            reject(error) 
        }
    })
}

const deleteManyProduct = (ids) => {
    return new Promise(async (resolve, reject) => {
        try {

            await Product.deleteMany({ _id: ids })
            resolve({
                status: 'OK',
                message: 'Delete user success',
            })
        } catch (e) {
            reject(e)
        }
    })
}

module.exports = {
    createProduct,
    updateProduct,
    deleteProduct,
    getAllProduct,
    getDetailsProduct,
    deleteManyProduct,
    sortProduct,
    getRatingProduct
} 