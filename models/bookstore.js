const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    author: {
        type: String,
        required: [true, "Please provide the name of the author"],
        trim: true,
        maxlength: [50, "Author Name Should be 50 Characters long"]
    },
    title: {
        type: String,
        required: [true, "Please provide title of the book"],
        trim: true,
        maxlength: [200, "Title should be less than 200 characters"]
    }
})

module.exports = mongoose.model("Book", bookSchema);