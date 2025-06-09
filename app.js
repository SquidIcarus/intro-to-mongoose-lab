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

    while (true) {
        console.log('\nWhat would you like to do?');
        console.log('\n1. Create customer');
        console.log('2. View all customers');
        console.log('3. Update a customer');
        console.log('4. Delete a customer');
        console.log('5. Quit');

        const choice = prompt('Enter your choice: ');

        if (choice === '1') {
            console.log('you selected choice 1')
        } else if (choice === '2') {
            console.log('you selected choice 2')
        } else if (choice === '3') {
            console.log('you selected choice 3')
        } else if (choice === '4') {
            console.log('you selected choice 4')
        } else if (choice === '5') {
            console.log('See you later!');
            process.exit();
        } else {
            console.log('Please choose from menu items 1 - 5');
        }
    }
};

main();