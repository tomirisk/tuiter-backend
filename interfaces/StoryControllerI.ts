import {Request, Response} from "express";

/**
 * @file Declares API for Stories resource
 */
export default interface StoryControllerI {
  findStories (req: Request, res: Response): void;
  findStoryById (req: Request, res: Response): void;
  findStoriesByUser (req: Request, res: Response): void;
  createStory (req: Request, res: Response): void;
  deleteStoryByID (req: Request, res: Response): void;
  deleteAllStories (req: Request, res: Response): void;
};