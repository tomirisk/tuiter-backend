/**
 * @file Declares API for Stories related data access object methods
 */
import Story from "../models/stories/story";

export default interface StoryDaoI {
  findStories(): Promise<Story[]>;
  findStoryById (sid: string): Promise<any>;
  findStoriesByUser (uid: string): Promise<Story[]>;
  findStoriesByVisibility (visibility: string): Promise<Story[]>;
  createStory (uid: string, story: Story): Promise<Story>;
  deleteStoryByID (sid: string): Promise<any>;
  deleteAllStories (uid: string): Promise<any>;
};