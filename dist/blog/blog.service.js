"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const blog_entity_1 = require("./entities/blog.entity");
const typeorm_2 = require("typeorm");
let BlogService = class BlogService {
    constructor(blogRepo) {
        this.blogRepo = blogRepo;
    }
    async create(createBlogDto, admin) {
        try {
            const newBlog = await this.blogRepo.create(Object.assign(Object.assign({}, createBlogDto), { author: admin, category: createBlogDto.category }));
            await this.blogRepo.save(newBlog);
            return newBlog;
        }
        catch (error) {
            throw new common_1.UnauthorizedException('invalid admin');
        }
    }
    async Search(title, query) {
        return this.blogRepo.find({ relations: ['category', 'author'],
            where: {
                title: (0, typeorm_2.Like)(`%${title}%`)
            },
            order: {
                id: 'DESC'
            }
        });
    }
    async findAll() {
        return this.blogRepo.find({ relations: ['category', 'author'],
            order: {
                id: 'DESC'
            } });
    }
    findOne(id) {
        const blog = this.blogRepo.findOne({ relations: ['category', 'author'], where: { id: id } });
        if (blog)
            return blog;
        throw new common_1.NotFoundException('blog not found');
    }
    update(id, updateBlogDto, author) {
        return this.blogRepo.update(id, Object.assign(Object.assign({}, updateBlogDto), { updatedBy: author, updated_at: new Date }));
    }
    async remove(id, author) {
        const deletresponce = await this.blogRepo.softDelete(id);
        if (deletresponce) {
            this.blogRepo.update(id, { deletedBy: author });
        }
        if (!deletresponce.affected)
            throw new common_1.NotFoundException(id);
    }
};
BlogService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(blog_entity_1.Blog)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], BlogService);
exports.BlogService = BlogService;
//# sourceMappingURL=blog.service.js.map