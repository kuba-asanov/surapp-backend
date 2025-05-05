import { Column, Entity, OneToMany } from 'typeorm';

import { BaseEntity } from 'src/shared/models/base-entity';
import { UserRole } from 'src/infrastructure/enums/user-role.enum';
import { PostEntity } from 'src/posts/models/post.entity';

@Entity('users')
export class User extends BaseEntity {
  @Column({ type: 'text', unique: true, nullable: true })
  email: string;

  @Column({ type: 'text', unique: true, nullable: false })
  username: string;

  @Column({ type: 'text', unique: true, nullable: true })
  phone: string;

  @Column({ type: 'text' })
  password: string;

  @Column({ type: 'text', default: '' })
  name: string;

  @Column({ type: 'text', default: '' })
  surname: string;

  @Column({ type: 'text', default: '' })
  bio: string;

  @Column({ type: 'text', nullable: true })
  avatar_url: string;

  @Column({ type: 'boolean', default: false })
  onboarded: boolean;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.USER })
  role: UserRole;

  @Column({ type: 'text', nullable: true })
  device_id: string;

  @OneToMany(() => PostEntity, (post) => post.author)
  posts: PostEntity[];

  @OneToMany(() => PostEntity, (post) => post.recipient)
  answers: PostEntity[];
}
