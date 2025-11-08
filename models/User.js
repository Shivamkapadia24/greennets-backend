const mongoose = require('mongoose');
const Schema = mongoose.Schema; // Import Schema

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    // --- NEW FIELDS ---
    cart: [
        {
            product: {
                type: Schema.Types.ObjectId, // Reference to a Product document's ID
                ref: 'Product', // Links to the 'Product' model
                required: true
            },
            quantity: {
                type: Number,
                required: true,
                min: 1, // Quantity must be at least 1
                default: 1
            }
        }
    ],
    wishlist: [
        {
            type: Schema.Types.ObjectId, // Reference to a Product document's ID
            ref: 'Product' // Links to the 'Product' model
        }
    ]
    // --- END NEW FIELDS ---
}, {
    timestamps: true 
});

const User = mongoose.model('User', userSchema);

module.exports = User;