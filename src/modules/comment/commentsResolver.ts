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
import { Min, Max } from "class-validator";
import { HnApi } from "../../decorators/hacker-news";
import HackerNewsApi from "../../datasources/hacker-news";

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
    @HnApi() hnApi: HackerNewsApi,
    @Args() { limit, offset }: CommentsArgs
  ): Promise<Comment[]> {
    return hnApi.getComments(story.kids, limit, offset);
  }
}

@Resolver(Comment)
export class CommentCommentsResolver {
  @FieldResolver()
  async comments(
    @Root() comment: Comment,
    @HnApi() hnApi: HackerNewsApi,
    @Args() { limit, offset }: CommentsArgs
  ): Promise<Comment[]> {
    return hnApi.getComments(comment.kids, limit, offset);
  }
}

@Resolver()
export class CommentsResolver {
  @Query(returns => [Comment], {
    description: "Return child comments on Item."
  })
  async comments(
    @HnApi() hnApi: HackerNewsApi,
    @Args() { parentId, limit, offset }: RootCommentsArgs
  ): Promise<Comment[]> {
    const comment = await hnApi.getComment(parentId, limit, offset);
    return hnApi.getComments(comment.kids, limit, offset);
  }
}
