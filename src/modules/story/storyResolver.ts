import { Resolver, Query, Int, Ctx, ArgsType, Field, Args } from "type-graphql";
import { Story } from "./storyModel";
import { Min } from "class-validator";
import { HnApi } from "../../decorators/hacker-news";
import HackerNewsApi from "../../datasources/hacker-news";

@ArgsType()
class StoryArgs {
  @Min(1)
  @Field(type => Int)
  id: number;
}

@Resolver()
export class StoryResolver {
  @Query(returns => Story)
  async story(
    @HnApi() hnApi: HackerNewsApi,
    @Args() { id }: StoryArgs
  ): Promise<Story> {
    return hnApi.getStory(id);
  }
}
