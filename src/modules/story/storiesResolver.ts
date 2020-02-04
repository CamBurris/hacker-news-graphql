import { Query, Resolver, Int, Field, Ctx, ArgsType, Args } from "type-graphql";
import { Story } from "./storyModel";
import { Max, Min } from "class-validator";
import { HnApi } from "../../decorators/hacker-news";
import HackerNewsApi from "../../datasources/hacker-news";

@ArgsType()
class StoryArgs {
  @Min(1)
  @Max(50)
  @Field(type => Int, { nullable: true, defaultValue: 25 })
  limit: number;
}

@Resolver()
export class StoriesResolver {
  @Query(returns => [Story])
  async stories(
    @HnApi() hnApi: HackerNewsApi,
    @Args() { limit }: StoryArgs
  ): Promise<Story[]> {
    return hnApi.getStories(limit);
  }
}
