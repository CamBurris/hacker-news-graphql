import {
  Resolver,
  FieldResolver,
  Root,
  Query,
  Int,
  Ctx,
  ArgsType,
  Field,
  Args
} from "type-graphql";
import { Story } from "../story/storyModel";
import { Comment } from "./commentModel";
import { Context } from "../../types/context";
import { Min, Max } from "class-validator";

@ArgsType()
class CommentsArgs {
  @Min(1)
  @Max(50)
  @Field(type => Int, { nullable: true, defaultValue: 25 })
  limit: number;

  @Min(0)
  @Field(type => Int, { nullable: true, defaultValue: 0 })
  offset: number;
}

@ArgsType()
class RootCommentsArgs extends CommentsArgs {
  @Min(1)
  @Field(type => Int)
  parentId: number;
}

@Resolver(Story)
export class StoryCommentsResolver {
  @FieldResolver()
  async comments(
    @Root() story: Story,
    @Ctx() context: Context,
    @Args() { limit, offset }: CommentsArgs
  ): Promise<Comment[]> {
    return context.dataSources.hnApi.getComments(story.kids, limit, offset);
  }
}

@Resolver(Comment)
export class CommentCommentsResolver {
  @FieldResolver()
  async comments(
    @Root() comment: Comment,
    @Ctx() context: Context,
    @Args() { limit, offset }: CommentsArgs
  ): Promise<Comment[]> {
    return context.dataSources.hnApi.getComments(comment.kids, limit, offset);
  }
}

@Resolver()
export class CommentsResolver {
  @Query(returns => [Comment], {
    description: "Return child comments on Item."
  })
  async comments(
    @Ctx() context: Context,
    @Args() { parentId, limit, offset }: RootCommentsArgs
  ): Promise<Comment[]> {
    const comment = await context.dataSources.hnApi.getComment(
      parentId,
      limit,
      offset
    );
    return context.dataSources.hnApi.getComments(comment.kids, limit, offset);
  }
}
