# Hacker News GraphQL

A GraphQL api for Hacker News. Built with Typescript and TypeGraphQL. TypeGraphQL is used to define the schema and Apollo Server is the actual graph implementation. Also uses Apollo Datasource Rest for builtin caching.

# Commands

| Command      | Description                                                                                                                    |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------ |
| `yarn dev`   | Run server in dev mode. Uses ts-node for automatic re-compile. Loads graphql playground to interact with graph in development. |
| `yarn build` | Build production code.                                                                                                         |
| `yarn prod`  | Run application in production mode.                                                                                            |

# Setup

Install node. Only tested with node >= 12.

Run `yarn install` to install dependencies.

Run `yarn dev` to run in development mode.

# Debug

In development mode, node has the `--inspect` flag, so you can attach to it to debug. If using VS Code, there is a debug profile already setup in the repository.
