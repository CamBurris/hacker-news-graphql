import { Query, Resolver, Int, Field, Ctx, ArgsType, Args } from "type-graphql";
import { Story } from "./storyModel";
import { Max, Min } from "class-validator";
import { Context } from "../../types/context";

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
    @Ctx() context: Context,
    @Args() { limit }: StoryArgs
  ): Promise<Story[]> {
    return context.dataSources.hnApi.getStories(limit);
  }
}
