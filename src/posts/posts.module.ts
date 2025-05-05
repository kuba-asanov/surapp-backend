import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { UsersModule } from 'src/users/users.module';
import { PostEntity } from './models/post.entity';
import { CategoriesModule } from 'src/categories/categories.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([PostEntity]),
    UsersModule,
    CategoriesModule,
  ],
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule {}
