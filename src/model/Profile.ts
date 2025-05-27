import {Column, Entity as ORMEntity, Index} from "typeorm";
import {Entity} from "./Entity";

@ORMEntity("profiles")
export class Profile extends Entity {
  @Index()
  @Column({
    type: "text",
    nullable: true
  })
  name?: string | null;

  @Column({
    type: "text",
    nullable: true
  })
  location?: string | null;

  @Column({
    type: "text",
    nullable: true
  })
  imageUrl?: string | null;

  @Column({
    type: "text",
    nullable: true
  })
  headline?: string | null;

  @Column({
    type: "text",
    nullable: true
  })
  content?: string | null;
}