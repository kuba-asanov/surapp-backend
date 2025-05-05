import { Category } from 'src/categories/models/category.entity';
import { PostStatus } from 'src/infrastructure/enums/post-status.enum';
import { BaseEntity } from 'src/shared/models/base-entity';
import { User } from 'src/users/models/user.entity';
import { Column, Entity, ManyToMany, ManyToOne } from 'typeorm';

@Entity('posts')
export class PostEntity extends BaseEntity {
  @Column({
    type: 'text',
  })
  content: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  answer: string;

  @Column({
    type: 'enum',
    enum: PostStatus,
    default: PostStatus.PENDING,
  })
  status: PostStatus;

  @ManyToOne(() => User)
  author: User;

  @ManyToOne(() => User)
  recipient: User;

  @ManyToMany(() => Category, (category) => category.posts)
  categories: Category[];
}
