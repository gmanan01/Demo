import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Tag } from "./tag";
import { Writer } from "./writer";

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => Writer, (writer) => writer.id)
  writer: Writer;

  @Column()
  imageUrl: string;

  @Column()
  price: number;

  @ManyToMany(() => Tag)
  @JoinTable()
  tags: Tag[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
