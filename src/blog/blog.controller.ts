import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, UseInterceptors, UploadedFile, NotFoundException, Query } from '@nestjs/common';
import { BlogService } from './blog.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { AuthGuard } from '@nestjs/passport';
import { Category } from 'src/category/entities/category.entity';
import { CategoryService } from 'src/category/category.service';
import { CreateCategoryDto } from 'src/category/dto/create-category.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';



@Controller('blog')
export class BlogController {
  constructor(private readonly blogService: BlogService,
    private readonly catService : CategoryService) {}


  @UseInterceptors(FileInterceptor('blogImage' ,{
    storage : diskStorage({
      destination:'./files',
      filename:(req,file,cb)=>{
        const filename = file.originalname
        cb(null ,filename)
      }
    })
  }))

  @UseGuards(AuthGuard('jwt'))
  @Post('add')
  create(@Body() createBlogDto: CreateBlogDto , @Req() req , catDto : CreateCategoryDto , @UploadedFile() blogImage : Express.Multer.File)
  {
    try{
        createBlogDto.blogImage = blogImage.path
        const add = this.blogService.create(createBlogDto , req.user );
        return add
    }catch(error){
        throw new NotFoundException('file not found')
    }
    
  }
  @UseGuards(AuthGuard('jwt'))
  @Get(':title')
  findandSearch(@Param('title') title : string ,
  @Param('query') query:string) {
    return this.blogService.Search(title,query);
  }

  @Get('all')
  findAll(){
    return this.blogService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.blogService.findOne(+id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBlogDto: UpdateBlogDto , @Req() req) {
    return this.blogService.update(+id, updateBlogDto , req.user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  remove(@Param('id') id: string , @Req() req) {
    return this.blogService.remove(+id ,req.user);
  }
}
