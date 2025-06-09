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

        const choice = prompt('\nEnter your choice: ');

        if (choice === '1') {
            try {
                const name = prompt('Enter customer name: ');
                const age = prompt('Enter customer age: ');
                const newCustomer = await Customer.create({ name, age });
                console.log('\nCustomer created: ', newCustomer);
            } catch (err) {
                console.log('I am Error:', err.message);
            };
        } else if (choice === '2') {
            // console.log('\nyou selected choice 2');
            try {
                const customers = await Customer.find();
                if (customers.length === 0) {
                    console.log('\nNo customers found.');
                } else {
                    customers.forEach((customer, index) => {
                        console.log(`\n${index + 1}. id: ${customer.id} -- Name: ${customer.name}, Age: ${customer.age}`);
                    });
                }
            } catch (err) {
                console.log('Error fetching customers', err.message);
            }
        } else if (choice === '3') {
            console.log('\nyou selected choice 3')
        } else if (choice === '4') {
            console.log('\nyou selected choice 4')
        } else if (choice === '5') {
            console.log('\nSee you later!');
            process.exit();
        } else {
            console.log('\nPlease choose from menu items 1 - 5');
        }
    }
};

main().catch(err => console.log('I am error:', err));