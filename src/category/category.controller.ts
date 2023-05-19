import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { AuthGuard } from '@nestjs/passport';
import { Category } from './entities/category.entity';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

 
  @Post('add')
  @UseGuards(AuthGuard('jwt'))
  create(@Body() createCategoryDto: CreateCategoryDto ,@Req() req): Promise<Category> {
    return this.categoryService.create(createCategoryDto , req.user);
  }
  @UseGuards(AuthGuard('jwt'))
  @Get()
  findAll() {
    return this.categoryService.findAll();
  }
  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  findOne(@Param('id') id: number ) {
    return this.categoryService.findOne(+id);
  }
  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto , @Req() req) {
    return this.categoryService.update(+id, updateCategoryDto,req.user);
  }
  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  remove(@Param('id') id: string , @Req() req) {
    return this.categoryService.deleteCategory(+id , req.user);
  }
}
