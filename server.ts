import express from 'express';
import UserDao from "./daos/UserDao";
import TuitDao from "./daos/TuitDao";
import UserController from './controllers/UserController';
import TuitController from "./controllers/TuitController";
import mongoose from 'mongoose';
const app = express();
mongoose.connect('mongodb://localhost:27017/tuiter');

app.use(express.json());

app.get('/hello', (req, res) => {
    res.send('Hello World!!!!')
});

app.get('/add/:a/:b', (req, res) => {
    res.send(req.params.a + req.params.b);
});

const userDao = new UserDao();
const userController = new UserController(app, userDao);

const tuitDao = new TuitDao();
const tuitController = new TuitController(app, tuitDao);

const PORT = 4000;
app.listen(process.env.PORT || PORT);


