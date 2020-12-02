import "reflect-metadata";
const express = require('express');
const bodyParser = require('body-parser');
import * as path from 'path';
const app = express();
import * as cors from 'cors';
app.use(cors());
import { createConnection, getConnection, getRepository } from "typeorm";
import { User } from "./entity/User";
app.use('/static', express.static(path.join(__dirname, '..')));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(bodyParser.json({ limit: '50mb' }));






// createConnection().then(async connection => {

//     console.log("Inserting a new user into the database...");
//     const user = new User();
//     user.firstName = "Timber";
//     user.lastName = "Saw";
//     user.age = 25;
//     await connection.manager.save(user);
//     console.log("Saved a new user with id: " + user.id);

//     console.log("Loading users from the database...");
//     const users = await connection.manager.find(User);
//     console.log("Loaded users: ", users);

//     console.log("Here you can setup and run express/koa/any other framework.");

// }).catch(error => console.log(error));


(async () => {
    try {
        await createConnection({
            "name": "default",
            "type": "mongodb",
            url: process.env.NODE_ENV === 'production' ? process.env.MONGO_DB_URI : '',
            "database": "firstproject",
            "synchronize": true,
            "logging": false,
            "entities": [
                "src/entity/**/*.ts"
            ],
        });
        console.log('connection is successeded ...');

    } catch (error) {
        console.log('connection is failured ...');

    }
})();
console.log('after async');


app.get('/users', async (req, res) => {
    try {
        const userRepo = getConnection('default').getRepository(User);

        const users: User[] | [] = await userRepo.find();
        res.json(users);
    } catch (error) {
        console.log(error);

        res.json({ error: error, msg: error.message });
    }
});

app.post('/users', async (req, res) => {
    console.log(req.body);

    try {
        const userRepo = getConnection('default').getRepository(User);
        const { firstName, lastName, age } = req.body;
        const user = new User();
        user.firstName = firstName;
        user.lastName = lastName;
        user.age = age;
        const savedUser = await userRepo.save(user);
        res.json(savedUser);
    } catch (error) {
        res.json({ error: error, msg: error.message });
    }
});

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '../index.html'))
});

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`server is running now on port ${port}`));




























/*
createConnection().then(async connection => {

    console.log("Inserting a new user into the database...");
    const user = new User();
    user.firstName = "Timber";
    user.lastName = "Saw";
    user.age = 25;
    await connection.manager.save(user);
    console.log("Saved a new user with id: " + user.id);

    console.log("Loading users from the database...");
    const users = await connection.manager.find(User);
    console.log("Loaded users: ", users);

    console.log("Here you can setup and run express/koa/any other framework.");

}).catch(error => console.log(error));
*/