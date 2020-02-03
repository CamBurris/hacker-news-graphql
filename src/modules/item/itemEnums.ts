import { registerEnumType } from "type-graphql";

export enum ItemType {
  STORY = "story",
  JOB = "job",
  COMMENT = "comment",
  POLL = "poll",
  POLLOPT = "pollopt"
}

registerEnumType(ItemType, {
  name: "ItemType",
  description: "Types for Items"
});
