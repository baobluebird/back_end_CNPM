const Order = require('../models/OrderModel');
const dotenv = require('dotenv');
dotenv.config();

const getAllOrder = (sortName, sortType, nameSort) => {
    return new Promise(async (resolve, reject) => {
        try{
            let allOrder;
            if(nameSort === 'Nhận tại cửa hàng'){
                allOrder = await Order.find({
                    shippingMethod: 'nhan tai cua hang'
                });
            }else if(nameSort === 'Giao hàng tận nơi'){
                allOrder = await Order.find({
                    shippingMethod: 'giao hang tan noi'
                });
            }
            else if (sortName && sortType) {
                const objectSort = { [sortName]: sortType };
                allOrder = await Order.find().sort(objectSort);
            } else {
                allOrder = await Order.find().sort({ createdAt: -1, updatedAt: -1 });
            }

            resolve(allOrder);
        }catch(error){
            reject(error) 
        }
    })
}

const getDetailsOrder = (id) => {
    return new Promise(async (resolve, reject) => {
        try{
            const order = await Order.findOne({
                _id: id
            })

            if(order == null){
                resolve({
                    status: 'error',
                    message: 'The order is not exist'
                })
            }

            resolve(order)
        }catch(error){
            reject(error) 
        }
    })
}

const getUniqueYears = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const uniqueYears = await Order.aggregate([
                {
                    $group: {
                        _id: { $year: "$createdAt" }
                    }
                },
                {
                    $project: {
                        _id: 0,
                        year: "$_id"
                    }
                },
                {
                    $sort: { year: 1 }
                }
            ]);

            resolve(uniqueYears.map(entry => entry.year));
        } catch (error) {
            reject(error);
        }
    });
};

const getAllOrderManagementByYear = async (selectedYear) => {
    return new Promise(async (resolve, reject) => {
        try {
            const matchStage = {
                $match: {
                    createdAt: {
                        $gte: new Date(selectedYear, 0, 1),
                        $lt: new Date(selectedYear + 1, 0, 1)
                    }
                },
            };

            const allOrder = await Order.aggregate([
                matchStage,
                {
                    $project: {
                        month: { $month: "$createdAt" },
                        year: { $year: "$createdAt" },
                    },
                },
                {
                    $group: {
                        _id: { month: "$month", year: "$year" },
                        orderCount: { $sum: 1 },
                    },
                },
                {
                    $sort: { "_id.year": 1, "_id.month": 1 },
                },
            ]);

            resolve(allOrder);
        } catch (e) {
            console.error("Error in getAllOrderManagementByYear:", e);
            reject(e);
        }
    });
};


const getAllOrderManagement = async () => {
    return new Promise(async (resolve, reject) => {
        try {
            const allOrder = await Order.aggregate([
                {
                    $project: {
                        month: { $month: "$createdAt" },
                        year: { $year: "$createdAt" },
                    },
                },
                {
                    $group: {
                        _id: { month: "$month", year: "$year" },
                        orderCount: { $sum: 1 },
                    },
                },
                {
                    $sort: { "_id.year": 1, "_id.month": 1 },
                },
            ]);
            resolve(allOrder);
        } catch (e) {
            reject(e);
        }
    });
};


module.exports = {
    getAllOrder,
    getDetailsOrder,
    getAllOrderManagement,
    getUniqueYears,
    getAllOrderManagementByYear
}