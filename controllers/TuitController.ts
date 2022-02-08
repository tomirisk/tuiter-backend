import {Request, Response, Express} from "express";
import TuitDao from "../daos/TuitDao";
import TuitControllerI from "../interfaces/TuitController";
import Tuit from "../models/tuits/Tuit";

export default class TuitController implements TuitControllerI {
    app: Express;
    tuitDao: TuitDao;
    constructor(app: Express, tuitDao: TuitDao) {
        this.app = app;
        this.tuitDao = tuitDao;
        this.app.get('/api/tuits', this.findAllTuits);
        this.app.get('/api/tuits/:tid', this.findTuitById);
        this.app.get('/api/users/:userid/tuits', this.findTuitsByUser);
        this.app.post('/api/tuits', this.createTuit);
        this.app.put('/api/tuits/:tid', this.updateTuit);
        this.app.delete('/api/tuits/:tid', this.deleteTuit);
    }

    findAllTuits = (req: Request, res: Response) =>
        this.tuitDao.findAllTuits().then((tuits: Tuit[]) => res.json(tuits));

    findTuitById = (req: Request, res: Response) =>
        this.tuitDao.findTuitById(req.params.tid).then((tuit: Tuit) => res.json(tuit));

    findTuitsByUser = (req: Request, res: Response) =>
        this.tuitDao.findTuitsByUser(req.params.userid).then((tuits: Tuit[]) => res.json(tuits));

    createTuit = (req: Request, res: Response) =>
        this.tuitDao.createTuit(req.body).then((tuit: Tuit) => res.json(tuit));

    updateTuit = (req: Request, res: Response) =>
        this.tuitDao.updateTuit(req.params.tid, req.body).then(status => res.json(status));

    deleteTuit = (req: Request, res: Response) =>
        this.tuitDao.deleteTuit(req.params.tid).then(status => res.json(status));

}

