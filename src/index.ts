import "reflect-metadata";
import { ApolloServer } from "apollo-server-express";
import express from "express";
import { buildSchema, Resolver, Query } from "type-graphql";
import { StoriesResolver } from "./modules/story/storiesResolver";
import {
  StoryCommentsResolver,
  CommentCommentsResolver
} from "./modules/comment/commentsResolver";
import { StoryResolver } from "./modules/story/storyResolver";
import HackerNewsApi from "./datasources/hacker-news";
import { HttpsAgent } from "agentkeepalive";

const agent = new HttpsAgent({
  keepAliveMsecs: 10000
});

const main = async () => {
  const schema = await buildSchema({
    resolvers: [
      StoriesResolver,
      StoryCommentsResolver,
      CommentCommentsResolver,
      StoryResolver
    ]
  });

  const server: ApolloServer = new ApolloServer({
    schema,
    dataSources: () => {
      return {
        hnApi: new HackerNewsApi(agent)
      };
    },
    tracing: true
  });

  const app = express();

  server.applyMiddleware({ app });

  app.listen(4000, () =>
    console.log("Server started on http://localhost:4000/graphql")
  );
};

main();
