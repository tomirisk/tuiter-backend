import User from "../models/users/User";
import UserModel from "../mongoose/users/UserModel";
import UserDaoI from "../interfaces/UserDao";

export default class UserDao implements UserDaoI {
    async findAllUsers(): Promise<User[]> {
        return await UserModel.find().exec();
    }
    async findUserById(uid: string): Promise<any> {
        return await UserModel.findById(uid).exec();
    }
    async createUser(user: User): Promise<User> {
        return await UserModel.create(user);
    }
    async deleteUser(uid: string): Promise<any> {
        return await UserModel.deleteOne({_id: uid}).exec();
    }
    async updateUser(uid: string, user: User): Promise<any> {
        return await UserModel.updateOne({_id: uid}, {$set: user}).exec();
    }
}

