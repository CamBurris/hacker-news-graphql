import { RESTDataSource, RequestOptions } from "apollo-datasource-rest";
import { Story } from "../modules/story/storyModel";
import { Comment } from "../modules/comment/commentModel";
import { HttpsAgent } from "agentkeepalive";

class HackerNewsApi extends RESTDataSource {
  baseUrl: string;
  agent: HttpsAgent;

  constructor(agent: HttpsAgent) {
    super();
    this.agent = agent;
    this.baseURL = "https://hacker-news.firebaseio.com/v0/";
  }

  willSendRequest(request: RequestOptions) {}

  async getStory(id: number) {
    const story: Story = await this.get(`item/${id}.json`, null, {
      // cacheOptions: { ttl: 60 * 5 },
      agent: this.agent
    });
    const storyClass = new Story(story);
    return storyClass;
  }

  async getStories(limit: number): Promise<Story[]> {
    const storyIds: number[] = await this.get("topstories.json", null, {
      // cacheOptions: { ttl: 60 * 5 }
      agent: this.agent
    });
    const trimmedIds = storyIds.slice(0, limit);
    const promises: Promise<Story>[] = trimmedIds.map(id => this.getStory(id));
    const stories: Story[] = await Promise.all(promises);
    return stories;
  }

  async getComment(
    id: number,
    limit: number,
    offset: number
  ): Promise<Comment> {
    const comment: Comment = await this.get(`item/${id}.json`, null, {
      // cacheOptions: { ttl: 60 * 5 }
      agent: this.agent
    });
    const commentClass = new Comment(comment);
    commentClass.kids = commentClass.kids.slice(offset, limit);
    return commentClass;
  }

  async getComments(
    ids: number[],
    limit: number,
    offset: number
  ): Promise<Comment[]> {
    const commentIds = ids.slice(offset, limit);
    const promises: Promise<Comment>[] = commentIds.map(id =>
      this.getComment(id, limit, offset)
    );
    const comments = await Promise.all(promises);
    return comments;
  }
}

export default HackerNewsApi;
