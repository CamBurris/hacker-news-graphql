import HackerNewsApi from "../datasources/hacker-news";

export type Context = {
  dataSources: {
    hnApi: HackerNewsApi;
  };
};
