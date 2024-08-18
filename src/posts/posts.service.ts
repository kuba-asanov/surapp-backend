import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { BaseService } from 'src/shared/base.service';
import { InjectRepository } from '@nestjs/typeorm';
import { PostEntity } from './models/post.entity';
import { Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';
import { UserRole } from 'src/infrastructure/enums/user-role.enum';
import { ErrorMessages } from 'src/infrastructure/enums/error-messages.enum';

@Injectable()
export class PostsService extends BaseService<PostEntity> {
  constructor(
    @InjectRepository(PostEntity)
    private readonly postsRepository: Repository<PostEntity>,
    private readonly usersService: UsersService,
  ) {
    super(postsRepository);
  }

  async create(userId: number, createPostDto: CreatePostDto) {
    const { recipientId } = createPostDto;
    const author = await this.usersService.getBy({ id: userId });

    const recipient = await this.usersService.getBy(
      { id: recipientId },
      {},
      false,
    );

    if (!recipient) {
      throw new NotFoundException(ErrorMessages.RECIPIENT_NOT_FOUND);
    } else if (recipient.role !== UserRole.RECITER) {
      throw new BadRequestException(ErrorMessages.RECIPIENT_IS_NOT_RECITER);
    }

    const newPost = new PostEntity();
    newPost.author = author;
    newPost.recipient = recipient;
    newPost.absorbFromDto(createPostDto);

    return await this.postsRepository.save(newPost);
  }

  findAll() {
    return `This action returns all posts`;
  }

  findOne(id: number) {
    return `This action returns a #${id} post`;
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return {
      id,
      updatePostDto,
    };
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
