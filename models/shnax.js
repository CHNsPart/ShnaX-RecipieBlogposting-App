//schema
var mongoose = require('mongoose');
var shnaxSchema = new mongoose.Schema({
    name: String,
    image: String,
    desc: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    },
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment"
    }]
});

module.exports = mongoose.model("Shnax", shnaxSchema);