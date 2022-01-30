import Tuit from "../models/tuits/Tuit";
import TuitModel from "../mongoose/tuits/TuitModel";
import TuitDaoI from "../interfaces/TuitDao";

export default class TuitDao implements TuitDaoI {

    async findAllTuits(): Promise<Tuit[]> {
        return await TuitModel.find().populate("postedBy").exec();
    }

    async findTuitsByUser(uid: string): Promise<Tuit[]> {
        return await TuitModel.find({postedBy : uid}).exec();
    }

    async findTuitById(tid: string): Promise<any> {
        return await TuitModel.findById(tid).populate("postedBy").exec();
    }

    // TODO : Use strongly typed method parameter
    async createTuit(tuit: any): Promise<Tuit> {
        return await TuitModel.create({...tuit, postedBy: tuit.postedBy});
    }

    async updateTuit(tid: string, tuit: Tuit):  Promise<any> {
        return await TuitModel.updateOne({_id: tid}, {$set: tuit}).exec();
    }

    async deleteTuit(tid: string): Promise<any> {
        return await TuitModel.deleteOne({_id: tid}).exec();
    }
}

