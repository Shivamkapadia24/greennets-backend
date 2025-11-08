// Import necessary packages
const express = require('express');
const cors = require('cors');
require('dotenv').config(); // Load environment variables from .env file
const authRoutes = require('./routes/auth'); // Import the auth routes
const mongoose = require('mongoose');
const productRoutes = require('./routes/products');
const cartRoutes = require('./routes/cart');
const wishlistRoutes = require('./routes/wishlist');
const authMiddleware = require('./middleware/authMiddleware');
const aiRoutes = require('./routes/ai');

// Initialize the Express app
const app = express();

// Middleware
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(express.json()); // Allow the server to accept JSON data in request bodies
app.use('/api/products', productRoutes);
// Apply authMiddleware BEFORE cartRoutes and wishlistRoutes
app.use('/api/cart', authMiddleware, cartRoutes);
app.use('/api/wishlist', authMiddleware, wishlistRoutes);
app.use('/api/ai', aiRoutes);

// --- MongoDB Connection ---
const dbURI = process.env.MONGODB_URI;
if (!dbURI) {
    console.error('Error: MONGODB_URI is not defined in .env file');
    process.exit(1); // Stop the application if DB URI is missing
}

mongoose.connect(dbURI)
    .then(() => console.log('MongoDB connected successfully'))
    .catch(err => {
        console.error('MongoDB connection error:', err);
        process.exit(1); // Stop the application on connection error
    });
// --- End of MongoDB Connection ---

// API Routes
app.use('/api/auth', authRoutes); // Use the auth routes for paths starting with /api/auth

// Define a simple test route
app.get('/', (req, res) => {
  res.send('GreenNets Backend is Running!'); 
});

// Define the port the server will listen on
const PORT = process.env.PORT || 5000; // Use port from .env file or default to 5000

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});