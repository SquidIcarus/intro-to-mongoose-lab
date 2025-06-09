// models/customer.js

const mongoose = require('mongoose');

const CustomerSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    age: { type: Number },
});