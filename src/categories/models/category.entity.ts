import { PostEntity } from 'src/posts/models/post.entity';
import { BaseEntity } from 'src/shared/models/base-entity';
import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';

@Entity('categories')
export class Category extends BaseEntity {
  @Column({
    type: 'text',
  })
  name: string;

  @ManyToMany(() => PostEntity, (post) => post.categories)
  @JoinTable()
  posts: PostEntity[];
}
