const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/ProductController');
const { authMiddleware} = require('../middleware/authMiddleware');

router.post('/create', authMiddleware,ProductController.createProduct);
router.put('/update/:id', authMiddleware, ProductController.updateProduct);
router.get('/get-details/:id', ProductController.getDetailsProduct);
router.delete('/delete/:id',authMiddleware, ProductController.deleteProduct);
router.get('/getAllProduct',ProductController.getAllProduct);

module.exports = router;