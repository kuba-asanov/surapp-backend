import { ConflictException, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './models/category.entity';
import { Repository } from 'typeorm';
import { BaseService } from 'src/shared/base.service';

@Injectable()
export class CategoriesService extends BaseService<Category> {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {
    super(categoryRepository);
  }

  async create(createCategoryDto: CreateCategoryDto) {
    const { name } = createCategoryDto;
    const categoryExists = await this.getBy({ name }, {}, false);

    if (categoryExists) {
      throw new ConflictException('Category with this name already exists');
    }

    const category = new Category();

    category.absorbFromDto(createCategoryDto);

    return this.categoryRepository.save(category);
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    const category = await this.getBy({ id });

    category.absorbFromDto(updateCategoryDto);

    return this.categoryRepository.save(category);
  }
}
