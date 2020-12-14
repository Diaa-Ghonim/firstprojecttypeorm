import "reflect-metadata";
// const express = require('express');
import express, { Application, Request, Response } from 'express';
// const bodyParser = require('body-parser');
const http = require('http');
const https = require('https');
import path from 'path';
const app: Application = express();
import cors from 'cors';
app.use(cors());
import { CustomMulter } from './middlewares/multerMiddleware';
import { getConnection } from "typeorm";
import { User } from "./entity/User";
import './initializeTypeormConnection';
app.use('/static', express.static(path.join(__dirname, '..', '..', 'client')));

// app.use(bodyParser.json({ limit: '50mb' }));
// app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(CustomMulter);
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true, parameterLimit: 1000000 }));
// app.set('port', process.env.PORT || 8000);
const router1 = express.Router();
const router2 = express.Router();

app.all('/users', (req, res, next) => {
    // console.log('all ', req.url);
    next();
})

// router1.use((req, res, next) => {
//     console.log('router1 middleware');
//     next();
// });
// router2.use((req, res, next) => {
//     console.log('router2 middleware');
//     next();
// });
router1.get('/users', async function asyncFunc(req, res) {
    try {
        const userRepo = getConnection().getRepository(User);

        const users: User[] | [] = await userRepo.find();
        res.json(users);
    } catch (error) {
        console.log(error);

        res.json({ error: error, msg: error.message });
    }
});

app.post('/upload-form', (request: Request, response: Response) => {
    // console.log(request, 'body');
    console.log(request.files, 'files');
    console.log(request.file, 'file');
    response.json({ success: true, file: request.files[0] });
});
router2.post('/users', async (req, res) => {
    // console.log(req.body);

    try {
        const userRepo = getConnection().getRepository(User);
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


app.use(router1, router2);


app.use((error, request: Request, response: Response) => {
    console.log(error);
    response.status(400).json({ error: error });
})
app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../client/index.html'))
});
// console.log(router1);

app.listen(2020, () => console.log(`server is running now on port ${app.get('port')}`));
// https.createServer(app).listen(8443);



























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

// export = {
//   "name": "default",
//   "type": "mongodb",
//   "database": "firstproject",
//   url: process.env.NODE_ENV
//   "synchronize": true,
//   "logging": false,
//   "entities": [
//     "src/entity/**/*.ts"
//   ],
//   "migrations": [
//     "src/migration/**/*.ts"
//   ],
//   "subscribers": [
//     "src/subscriber/**/*.ts"
//   ],
//   "cli": {
//     "entitiesDir": "src/entity",
//     "migrationsDir": "src/migration",
//     "subscribersDir": "src/subscriber"
//   }
// }