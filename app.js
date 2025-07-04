const dotenv = require('dotenv');
dotenv.config();
const mongoose = require('mongoose');
const express = require('express');
const prompt = require('prompt-sync')({ sigint: true });
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

        const choice = prompt('\nEnter your choice:\n');

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
            try {
                const customers = await Customer.find();
                if (customers.length === 0) {
                    console.log('\nNo customers found.');
                } else {
                    customers.forEach((customer, index) => {
                        console.log(`${index + 1}. \x1b[32mid\x1b[0m: ${customer._id} -- \x1b[32mName\x1b[0m: ${customer.name}, \x1b[32mAge\x1b[0m: ${customer.age}`);
                    });
                }
                prompt('\nPress enter to main main menu...')
            } catch (err) {
                console.log('Error fetching customers', err.message);
            }
        } else if (choice === '3') {
            try {
                const customers = await Customer.find();
                console.log('\nWho would you like to update?\n');
                customers.forEach((customer, index) => {
                    console.log(`${index + 1}. \x1b[32mid\x1b[0m: ${customer._id} -- \x1b[32mName\x1b[0m: ${customer.name}, \x1b[32mAge\x1b[0m: ${customer.age}`);
                });
                const id = prompt('\nCopy and \x1b[32mpaste\x1b[0m the \x1b[32mid\x1b[0m of the customer you would like to update here:\n');
                const customer = await Customer.findById(id);

                if (!customer) {
                    console.log('No customer with that ID');
                } else {
                    console.log(`\nFOUND customer, \x1b[32mid\x1b[0m: ${customer._id}, \x1b[32mName\x1b[0m: ${customer.name}, \x1b[32mAge\x1b[0m: ${customer.age};  `)
                    const newName = prompt('Update Name: ');
                    const newAge = prompt('Update Age: ');

                    customer.name = newName;
                    customer.age = newAge;
                    await customer.save();

                    console.log('customer updated!')
                }
            } catch (err) {
                console.log('Error updating customers', err.message);
            }
        } else if (choice === '4') {
             try {
                const customers = await Customer.find();
                console.log('\nWho would you like to delete?\n');
                customers.forEach((customer, index) => {
                    console.log(`${index + 1}. \x1b[32mid\x1b[0m: ${customer._id} -- \x1b[32mName\x1b[0m: ${customer.name}, \x1b[32mAge\x1b[0m: ${customer.age}`);
                });
                const id = prompt('\nCopy and \x1b[32mpaste\x1b[0m the \x1b[32mid\x1b[0m of the customer you would like to delete here:\n');
                const customer = await Customer.findById(id);

                if (!customer) {
                    console.log('No customer with that ID');
                } else {
                    console.log(`\nDELETE customer, \x1b[32mid\x1b[0m: ${customer._id}, \x1b[32mName\x1b[0m: ${customer.name}, \x1b[32mAge\x1b[0m: ${customer.age};  `)
                    
                    await customer.deleteOne({ _id: id });

                    console.log('customer deleted!');
                }
                prompt('\nPress enter to return to main menu');
            } catch (err) {
                console.log('Error updating customers', err.message);
            }
        } else if (choice === '5') {
            mongoose.connection.close();
            console.log('\ndisconnected from MongoDB')
            console.log('\nSee you later!');
            process.exit();
        } else {
            console.log('\nPlease choose from menu items 1 - 5');
        }
    }
};

main().catch(err => console.log('I am error:', err));