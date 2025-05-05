import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { ICurrentUserPayload } from 'src/infrastructure/interfaces/current-user-payload.interface';
import { ListParamsDto } from 'src/shared/dto/list-params.dto';
import { PostStatus } from 'src/infrastructure/enums/post-status.enum';
import { AnswerPostDto } from './dto/answer-post.dto';
import { PostListParamsDto } from './dto/post-list-params.dto';

@ApiTags('Posts')
@Controller('posts')
@ApiBearerAuth()
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a post' })
  async create(
    @Body() createPostDto: CreatePostDto,
    @CurrentUser() currentUser: ICurrentUserPayload,
  ) {
    const { sub } = currentUser;
    return this.postsService.create(sub, createPostDto);
  }

  @Get()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get list of posts' })
  async findAll(@Query() listParamsDto: ListParamsDto) {
    return this.postsService.list(
      listParamsDto,
      {},
      { author: true, recipient: true },
    );
  }

  @Get('categories')
  @ApiOperation({ summary: 'Get list of posts by categories' })
  async findByCategories(@Query() listParamsDto: PostListParamsDto) {
    return this.postsService.getByCategories(listParamsDto);
  }

  @Get('answered')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get list of posts' })
  async findAnswered(@Query() listParamsDto: ListParamsDto) {
    return this.postsService.list(
      listParamsDto,
      {
        status: PostStatus.ANSWERED,
      },
      { author: true, recipient: true },
    );
  }

  @Get(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get a post by id' })
  findOne(@Param('id') id: string) {
    return this.postsService.getBy(
      {
        id: +id,
      },
      {
        categories: true,
      },
    );
  }

  @Get('my/pending')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get my pending questions' })
  getMyPendingPosts(
    @Query() listParamsDto: ListParamsDto,
    @CurrentUser() currentUser: ICurrentUserPayload,
  ) {
    const { sub } = currentUser;

    return this.postsService.list(
      listParamsDto,
      {
        author: {
          id: sub,
        },
        status: PostStatus.PENDING,
      },
      { author: true, recipient: true },
    );
  }

  @Get('my/answered')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get my answered questions' })
  getMyAnsweredPosts(
    @Query() listParamsDto: ListParamsDto,
    @CurrentUser() currentUser: ICurrentUserPayload,
  ) {
    const { sub } = currentUser;

    return this.postsService.list(
      listParamsDto,
      {
        author: {
          id: sub,
        },
        status: PostStatus.ANSWERED,
      },
      { author: true, recipient: true },
    );
  }

  @Get('reciter/incoming')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get list of incoming questions for a reciter' })
  getReciterIncoming(
    @Query() listParamsDto: ListParamsDto,
    @CurrentUser() currentUser: ICurrentUserPayload,
  ) {
    const { sub } = currentUser;

    return this.postsService.list(
      listParamsDto,
      {
        recipient: {
          id: sub,
        },
        status: PostStatus.PENDING,
      },
      { author: true, recipient: true },
    );
  }

  @Get('reciter/answered')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get list of answered questions for a reciter' })
  getReciterAnswered(
    @Query() listParamsDto: ListParamsDto,
    @CurrentUser() currentUser: ICurrentUserPayload,
  ) {
    const { sub } = currentUser;

    return this.postsService.list(
      listParamsDto,
      {
        recipient: {
          id: sub,
        },
        status: PostStatus.ANSWERED,
      },
      { author: true, recipient: true },
    );
  }

  @Patch(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a post by id' })
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postsService.update(+id, updatePostDto);
  }

  @Patch('answer/:id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a post by id' })
  answer(
    @Param('id') id: string,
    @Body() updatePostDto: AnswerPostDto,
    @CurrentUser() currentUser: ICurrentUserPayload,
  ) {
    const { sub } = currentUser;
    return this.postsService.reciterAnswer(sub, +id, updatePostDto);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a post by id' })
  remove(@Param('id') id: string) {
    return this.postsService.remove(+id);
  }
}
