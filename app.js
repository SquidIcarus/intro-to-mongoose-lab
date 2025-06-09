const dotenv = require('dotenv');
dotenv.config();
const mongoose = require('mongoose');
const express = require('express');
const prompt = require('prompt-sync')();
const Customer = require('./models/customer');

const connect = async () => {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');
}

async function main() {
    await connect();

    console.log('\nWelcome to the CRM tool!');
    console.log('\nWhat would you like to do?');
};

main();