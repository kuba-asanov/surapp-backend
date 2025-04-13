import { PostStatus } from 'src/infrastructure/enums/post-status.enum';
import { BaseEntity } from 'src/shared/models/base-entity';
import { User } from 'src/users/models/user.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity('posts')
export class PostEntity extends BaseEntity {
  @Column({
    type: 'text',
  })
  title: string;

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
}
