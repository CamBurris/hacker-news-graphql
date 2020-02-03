import { ObjectType, Field, Int } from "type-graphql";
import { ItemType } from "../item/itemEnums";

@ObjectType()
export class Comment {
  @Field(() => Int)
  id: number = 0;

  @Field()
  dead: boolean = false;

  @Field()
  deleted: boolean = false;

  @Field()
  by: string = "";

  @Field(type => Int)
  descendants: number = 0;

  @Field(type => Int)
  score: number = 0;

  @Field(type => Int)
  time: number = 0;

  @Field()
  text: string = "";

  @Field(() => ItemType)
  type: ItemType = ItemType.COMMENT;

  @Field(() => Comment)
  comments: Comment[] = [];

  kids: number[] = [];

  parent: number = 0;

  constructor(obj: {
    id?: number;
    dead?: boolean;
    deleted?: boolean;
    by?: string;
    descendants?: number;
    score?: number;
    time?: number;
    text?: string;
    type?: ItemType;
    kids?: number[];
    parent?: number;
  }) {
    Object.assign(this, obj);
    this.descendants = this.kids.length;
  }
}
