const dotenv = require('dotenv');
dotenv.config();
const mongoose = require('mongoose');
const express = require('express');

const connect = async () => {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');
}

const prompt = require('prompt-sync')();

const username = prompt('What is your name? ');

console.log(`Your name is ${username}`);