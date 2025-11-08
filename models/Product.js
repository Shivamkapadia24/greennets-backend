const mongoose = require('mongoose');
const Schema = mongoose.Schema; 

const productSchema = new mongoose.Schema({
    // Using Strings for simplicity now, you could add more details like brand, etc.
    name: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    price: { type: Number, required: true, min: 0 },
    category: { 
        type: String, 
        required: true, 
        // --- REPLACE THIS ENUM ---
        enum: ['Green Nets', 'Tarpaulins', 'Accessories', 'Fasteners', 'Tensioning', 'Repair', 'Tirpal'],
        // --- END REPLACEMENT ---
        trim: true 
    },
    quality: {
        type: String,
        // Define the allowed quality levels
        enum: ['Premium', 'Standard', 'Economy', 'N/A', '160gsm', '200gsm', '250gsm'], 
        default: 'Standard', // Set a default
        trim: true
    },

    imageUrl: { type: String, trim: true }, // URL to the product image
    // You could add specific fields like shadePercentage, gsm, size later
    shadePercentage: { type: Number },
    gsm: { type: Number },
    size: { type: String }
}, {
    timestamps: true // Adds createdAt and updatedAt
});


// Add the third argument specifying the collection name
const Product = mongoose.model('Product', productSchema, 'products'); 

module.exports = Product;