const express = require('express');
const router = express.Router();
const OrderController = require('../../controllers/OrderController');
const { authMiddleware, authUserMiddleware} = require('../../middleware/authMiddleware');

router.post('/create/:id', OrderController.createOrder);
router.get('/get-all-order/:id', OrderController.getAllOrderDetails);
router.get('/get-details-order/:id', OrderController.getOrderDetails);
//router.delete('/cancel-order/:id', OrderController.cancelOrderDetails);
router.get('/get-all-order', authMiddleware, OrderController.getAllOrder);

module.exports = router;
