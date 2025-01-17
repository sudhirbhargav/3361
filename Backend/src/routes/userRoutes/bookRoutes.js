const express = require('express');
const router = express.Router();
const bookController = require('../../controllers/adminController/bookController');

router.get('/get_all_books', bookController.getAllBooks);

router.get('/get_books_by_id/:id', bookController.getBookById);


module.exports = router;
