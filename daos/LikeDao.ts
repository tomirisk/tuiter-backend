import LikeDaoI from "../interfaces/LikeDaoI";
import LikeModel from "../mongoose/likes/LikeModel";
import Like from "../models/likes/Like";

export default class LikeDao implements LikeDaoI {
    private static likeDao: LikeDao | null = null;

    public static getInstance = (): LikeDao => {
        if(LikeDao.likeDao === null) {
            LikeDao.likeDao = new LikeDao();
        }
        return LikeDao.likeDao;
    }

    private constructor() {}

    findAllUsersThatLikedTuit = async (tid: string): Promise<Like[]> => {
        return LikeModel.find({tuit: tid}).populate("likedBy");
    }

    findAllTuitsLikedByUser = async (uid: string): Promise<Like[]> => {
        return LikeModel.find({likedBy: uid}).populate("tuit");
    }

    userLikesTuit = async (uid: string, tid: string): Promise<any> => {
        return LikeModel.create({tuit: tid, likedBy: uid});
    }

    userUnlikesTuit = async (uid: string, tid: string): Promise<any> => {
        return LikeModel.deleteOne({tuit: tid, likedBy: uid});
    }
}