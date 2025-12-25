const mongoose = require('mongoose');

const petSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        default: "Sasha"
    },
    hunger:{
        type: Number,
        default: 100,
        min: 0,
        max: 100
    },
    happiness: {
        type: Number,
        default: 100,
        min: 0,
        max: 100
    },
    energy:{
        type: Number,
        default: 100,
        min: 0,
        max: 100
    },
    lastInteraction:{
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Pet', petSchema);