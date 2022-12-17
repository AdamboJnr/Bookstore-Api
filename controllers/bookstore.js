const Book = require('../models/bookstore');
const asyncWrapper = require('../middleware/async')
const { createCustomError } = require('../errors/custom-error')

const getAllBooks = asyncWrapper( async (req,res) => {
        const books = await Book.find({});
        if(!books){
                res.status(200).json({ books , msg: `No Items in the database. Please add to view`});
        }else{
                res.status(200).json({ books });
        } 
})

const saveBook = asyncWrapper( async (req, res) => {
        const book = await Book.create(req.body);
        res.status(200).json({ book });
})

const getSpecificBook = asyncWrapper( async (req, res, next) => {
        const { id: bookID } = req.params;
        const book = await Book.findOne({ _id: bookID });
        if(!book){
                return next(createCustomError(`No book with id: ${bookID}`, 404));
        }
        res.status(200).json({ book });
})

const updateBook = asyncWrapper( async (req, res, next) => {
        const { id: bookID } = req.params;
        const book = await Book.findOneAndUpdate({ _id: bookID }, req.body, { new: true, runValidators: true});
        if(!book){
                return next(createCustomError(`No book with id: ${bookID}`, 404));
        }
        res.status(200).json({ book });
})

const deleteBook = asyncWrapper( async (req, res, next) => {
        const { id: bookID } = req.params;
        const book = await Book.findOneAndDelete({ _id: bookID });

        if(!book){
                return next(createCustomError(`No book with id: ${bookID}`, 404));
        }

        res.status(200).json({ book, msg: 'Deleted Succesfully'});
})

module.exports = {
    getAllBooks,
    getSpecificBook,
    saveBook,
    updateBook,
    deleteBook
}