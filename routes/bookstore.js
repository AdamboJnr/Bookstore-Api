const express = require('express');
const router = express.Router();
const { getAllBooks, saveBook, getSpecificBook, updateBook, deleteBook} = require('../controllers/bookstore');

router.route('/').get(getAllBooks).post(saveBook);
router.route('/:id').get(getSpecificBook).patch(updateBook).delete(deleteBook);

module.exports = router;