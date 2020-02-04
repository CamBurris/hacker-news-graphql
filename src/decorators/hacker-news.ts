import { createParamDecorator } from "type-graphql";
import { Context } from "../types/context";

export const HnApi = (): ParameterDecorator => {
  return createParamDecorator<Context>(
    ({ context }) => context.dataSources.hnApi
  );
};
