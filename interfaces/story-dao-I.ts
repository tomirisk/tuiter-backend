/**
 * @file Declares API for Stories related data access object methods
 */
import Story from "../models/stories/story";
import User from "../models/users/user";

export default interface StoryDaoI {
  findStories(): Promise<Story[]>;
  findStoryById (sid: string): Promise<any>;
  findStoriesByUser (uid: string): Promise<Story[]>;
  findStoriesVisibleToUser (uid: string): Promise<Story[]>;
  findUsersWhoCanViewStory (sid: string): Promise<User[]>;
  createStory (uid: string, story: Story): Promise<Story>;
  deleteStoryByID (sid: string): Promise<any>;
  userDeletesTheirStories (uid: string): Promise<any>;
};