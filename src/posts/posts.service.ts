import { ListParamsDto } from 'src/shared/dto/list-params.dto';
import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { BaseService } from 'src/shared/base.service';
import { InjectRepository } from '@nestjs/typeorm';
import { PostEntity } from './models/post.entity';
import { In, Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';
import { UserRole } from 'src/infrastructure/enums/user-role.enum';
import { ErrorMessages } from 'src/infrastructure/enums/error-messages.enum';
import { ListDto } from 'src/shared/dto/list.dto';
import { AnswerPostDto } from './dto/answer-post.dto';
import { PostStatus } from 'src/infrastructure/enums/post-status.enum';
import { CategoriesService } from 'src/categories/categories.service';
import { PostListParamsDto } from './dto/post-list-params.dto';

@Injectable()
export class PostsService extends BaseService<PostEntity> {
  constructor(
    @InjectRepository(PostEntity)
    private readonly postsRepository: Repository<PostEntity>,
    private readonly usersService: UsersService,
    private readonly categoriesService: CategoriesService,
  ) {
    super(postsRepository);
  }

  async create(
    userId: number,
    createPostDto: CreatePostDto,
  ): Promise<PostEntity> {
    const { recipientId, categoryIds } = createPostDto;
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

    const categoriesList = await this.categoriesService.list(
      new ListParamsDto(),
      {
        id: In(categoryIds),
      },
    );

    newPost.categories = categoriesList.data;
    newPost.absorbFromDto(createPostDto);

    return await this.postsRepository.save(newPost);
  }

  async findAll(listParams: ListParamsDto): Promise<ListDto<PostEntity>> {
    const posts = await this.list(listParams, { categories: true });

    return posts;
  }

  async getByCategories(listParamsDto: PostListParamsDto) {
    const { categoryIds } = listParamsDto;

    let whereOptions = {};

    if (categoryIds) {
      whereOptions = {
        categories: {
          id: In(categoryIds),
        },
      };
    }

    const posts = await this.list(listParamsDto, whereOptions, {
      author: true,
      recipient: true,
      categories: true,
    });

    return posts;
  }

  async update(id: number, updatePostDto: UpdatePostDto): Promise<PostEntity> {
    const { categoryIds } = updatePostDto;
    const post = await this.getBy(
      { id },
      {
        categories: true,
      },
    );

    const categoriesList = await this.categoriesService.list(
      new ListParamsDto(),
      {
        id: In(categoryIds),
      },
    );

    post.categories = categoriesList.data;

    post.absorbFromDto(updatePostDto);

    return this.postsRepository.save(post);
  }

  async remove(id: number): Promise<PostEntity> {
    const post = await this.getBy({ id });

    return this.postsRepository.remove(post);
  }

  async reciterAnswer(userId: number, id: number, answerDto: AnswerPostDto) {
    const user = await this.usersService.getBy({ id: userId });
    if (user.role !== UserRole.RECITER) {
      throw new ForbiddenException('Not reciter');
    }

    const post = await this.getBy({ id }, { recipient: true });

    post.absorbFromDto(answerDto);
    post.status = PostStatus.ANSWERED;
    post.recipient = user;

    return this.postsRepository.save(post);
  }
}
