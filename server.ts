import express from 'express';
import UserDao from "./daos/UserDao";
import TuitDao from "./daos/TuitDao";
import UserController from './controllers/UserController';
import TuitController from "./controllers/TuitController";
import mongoose from 'mongoose';
const app = express();

const DB_USERNAME = process.env.DB_USERNAME;
const DB_PASSWORD = process.env.DB_PASSWORD;

const connectionString = `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@cluster0.ry4vp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
mongoose.connect(connectionString);

app.use(express.json());

app.get('/hello', (req, res) => {
    res.send('Hello World!!!!')
});

app.get('/add/:a/:b', (req, res) => {
    res.send(req.params.a + req.params.b);
});

const userController = new UserController(app, new UserDao());
const tuitController = new TuitController(app, new TuitDao());

const PORT = 4000;
app.listen(process.env.PORT || PORT);


