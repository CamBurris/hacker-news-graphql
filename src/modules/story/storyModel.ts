import { ObjectType, Field, Int } from "type-graphql";
import { ItemType } from "../item/itemEnums";
import { Comment } from "../comment/commentModel";

@ObjectType()
export class Story {
  @Field(() => Int)
  id: number = 0;

  @Field(type => Int)
  descendants: number = 0;

  @Field()
  by: string = "";

  @Field(type => Int)
  score: number = 0;

  @Field(type => Int)
  time: number = 0;

  @Field()
  title: string = "";

  @Field(() => ItemType)
  type: ItemType = ItemType.STORY;

  @Field()
  url: string = "";

  @Field(() => [Comment])
  comments: Comment[] = [];

  @Field()
  text: string = "";

  kids: number[] = [];

  constructor(obj: {
    id?: number;
    descendants?: number;
    by?: string;
    score?: number;
    time?: number;
    title?: string;
    type?: ItemType;
    url?: string;
    text?: string;
    kids?: number[];
  }) {
    Object.assign(this, obj);
  }
}
