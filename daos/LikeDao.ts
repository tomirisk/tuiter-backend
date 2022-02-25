/**
 * @file Implements DAO managing data storage of likes. Uses mongoose LikeModel
 * to integrate with MongoDB
 */
import LikeDaoI from "../interfaces/LikeDaoI";
import LikeModel from "../mongoose/likes/LikeModel";
import Like from "../models/likes/Like";

/**
 * @class LikeDao Implements Data Access Object managing data storage
 * of Likes
 * @property {LikeDao} likeDao Private single instance of LikeDao
 */
export default class LikeDao implements LikeDaoI {
    private static likeDao: LikeDao | null = null;

    /**
     * Creates singleton DAO instance
     * @returns LikeDao
     */
    public static getInstance = (): LikeDao => {
        if(LikeDao.likeDao === null) {
            LikeDao.likeDao = new LikeDao();
        }
        return LikeDao.likeDao;
    }

    private constructor() {}

    /**
     * Uses LikeModel to retrieve all like documents with all users that liked a tuit from likes collection
     * @param {string} tid Tuit's primary key
     * @returns Promise To be notified when the likes are retrieved from database
     */
    findAllUsersThatLikedTuit = async (tid: string): Promise<Like[]> => {
        return LikeModel.find({tuit: tid}).populate("likedBy");
    }

    /**
     * Uses LikeModel to retrieve all like documents with all tuits liked by a user from likes collection
     * @param {string} uid User's primary key
     * @returns Promise To be notified when the likes are retrieved from database
     */
    findAllTuitsLikedByUser = async (uid: string): Promise<Like[]> => {
        return LikeModel.find({likedBy: uid}).populate("tuit");
    }

    /**
     * Inserts like instance into the database
     * @param {string} uid User's primary key
     * @param {string} tid Tuit's primary key
     * @returns Promise To be notified when like is inserted into the database
     */
    userLikesTuit = async (uid: string, tid: string): Promise<any> => {
        return LikeModel.create({tuit: tid, likedBy: uid});
    }

    /**
     * Removes like instance into the database
     * @param {string} uid User's primary key
     * @param {string} tid Tuit's primary key
     * @returns Promise To be notified when like is removed into the database
     */
    userUnlikesTuit = async (uid: string, tid: string): Promise<any> => {
        return LikeModel.deleteOne({tuit: tid, likedBy: uid});
    }
}