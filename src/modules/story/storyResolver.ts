import { Resolver, Query, Int, Ctx, ArgsType, Field, Args } from "type-graphql";
import { Story } from "./storyModel";
import { Context } from "../../types/context";
import { Min } from "class-validator";

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
    @Ctx() context: Context,
    @Args() { id }: StoryArgs
  ): Promise<Story> {
    return context.dataSources.hnApi.getStory(id);
  }
}
