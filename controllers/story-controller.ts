/**
 * @file Controller RESTful Web service API for stories resource
 */
import StoryDao from "../daos/story-dao";
import StoryControllerI from "../interfaces/StoryControllerI";
import {Express, Request, Response} from "express";
import Story from "../models/stories/story";

/**
 * @class StoryController Implements RESTful Web service API for stories resource.
 * Defines the following HTTP endpoints:
 * <ul>
 *     <li>POST /api/users/:uid/stories to create a new story instance for a given user</li>
 *     <li>DELETE /api/stories/:sid to remove a particular story instance</li>
 *     <li>DELETE /api/users/:uid/stories to remove all stories of the particular user</li>
 *     <li>GET /api/stories/:sid to retrieve a particular story instances</li>
 *     <li>GET /api/users/:uid/stories/:sid to retrieve stories for a given user </li>
 *     <li>GET /api/stories to retrieve all the story instances</li>
 * </ul>
 * @property {TuitDao} tuitDao Singleton DAO implementing tuit CRUD operations
 * @property {TuitController} tuitController Singleton controller implementing
 * RESTful Web service API
 */
export default class StoryController implements StoryControllerI {
  private static storyDao: StoryDao = StoryDao.getInstance();
  private static storyController: StoryController | null = null;

  /**
   * Creates singleton controller instance
   * @param {Express} app Express instance to declare the RESTful Web service API
   * @return StoryController
   */
  public static getInstance = (app: Express): StoryController => {
    if(StoryController.storyController === null) {
      StoryController.storyController = new StoryController();

      app.post("/api/users/:uid/stories", StoryController.storyController.createStory);
      app.delete("/api/stories/:sid", StoryController.storyController.deleteStoryByID);
      app.delete("/api/users/:uid/stories", StoryController.storyController.deleteAllStories);
      app.get("/api/stories/:sid", StoryController.storyController.findStoryById);
      app.get("/api/users/:uid/stories/:sid", StoryController.storyController.findStoriesByUser);
      app.get("/api/stories", StoryController.storyController.findStories);
    }
    return StoryController.storyController;
  }

  private constructor() {}

  /**
   * Creates a new story instance
   * @param {Request} req Represents request from client, including body
   * containing the JSON object for the new story to be inserted in the
   * database
   * @param {Response} res Represents response to client, including the
   * body formatted as JSON containing the new story that was inserted in the
   * database
   */
  createStory = (req: Request, res: Response) =>
      StoryController.storyDao.createStory(req.params.uid, req.body).then((story: Story) => res.json(story));

  /**
   * Removes all story instances from the database
   * @param {Request} req Represents request from client
   * @param {Response} res Represents response to client, including status
   * on whether deleting all stories was successful or not
   */
  deleteAllStories = (req: Request, res: Response) =>
      StoryController.storyDao.deleteAllStories(req.params.uid).then(status => res.send(status));

  /**
   * Removes a story instance from the database
   * @param {Request} req Represents request from client, including path
   * parameter sid identifying the primary key of the story to be removed
   * @param {Response} res Represents response to client, including status
   * on whether deleting a story was successful or not
   */
  deleteStoryByID = (req: Request, res: Response) =>
      StoryController.storyDao.deleteStoryByID(req.params.sid).then(status => res.send(status));

  /**
   * Retrieves all stories from the database for a particular user and returns
   * an array of stories.
   * @param {Request} req Represents request from client
   * @param {Response} res Represents response to client, including the
   * body formatted as JSON arrays containing the story objects
   */
  findStoriesByUser = (req: Request, res: Response) =>
      StoryController.storyDao.findStoriesByUser(req.params.uid).then((stories: Story[]) => res.json(stories));

  /**
   * Retrieves the story by their primary key
   * @param {Request} req Represents request from client, including path
   * parameter sid identifying the primary key of the story to be retrieved
   * @param {Response} res Represents response to client, including the
   * body formatted as JSON containing the story that matches the story ID
   */
  findStoryById = (req: Request, res: Response) =>
      StoryController.storyDao.findStoryById(req.params.sid).then((story: Story) => res.json(story));

  /**
   * Retrieves all stories from the database and returns an array of stories.
   * @param {Request} req Represents request from client
   * @param {Response} res Represents response to client, including the
   * body formatted as JSON arrays containing the story objects
   */
  findStories = (req: Request, res: Response) =>
      StoryController.storyDao.findStories().then((stories: Story[]) => res.json(stories));

}