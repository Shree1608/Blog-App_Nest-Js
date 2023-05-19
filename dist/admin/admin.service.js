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
exports.AdminService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const admin_entity_1 = require("./entities/admin.entity");
const typeorm_2 = require("typeorm");
const bcrypt = require("bcrypt");
const jwt_1 = require("@nestjs/jwt");
let AdminService = class AdminService {
    constructor(adminRepo, jwtService) {
        this.adminRepo = adminRepo;
        this.jwtService = jwtService;
    }
    async adminSignup(adminDto) {
        const { adminName, email, password } = adminDto;
        const findemail = await this.adminRepo.findOneBy({ email });
        if (findemail) {
            throw new common_1.UnauthorizedException('email already exist');
        }
        const hashPass = await bcrypt.hash(password, 10);
        const admin = await this.adminRepo.create({
            adminName,
            email,
            password: hashPass
        });
        return this.adminRepo.save(admin);
    }
    async adminLogin(adminDto) {
        const { email, password } = adminDto;
        const admin = await this.adminRepo.findOneBy({ email });
        if (!admin) {
            throw new common_1.NotFoundException('user not found');
        }
        const isPass = await bcrypt.compare(password, admin.password);
        if (!isPass) {
            throw new common_1.UnauthorizedException('invalid password');
        }
        const token = this.jwtService.sign({ id: admin.id });
        const updateadmin = await this.adminRepo.update(admin.id, { token: token });
        return { token };
    }
    async adminLogout(admin) {
        const logout = this.adminRepo.update(admin.id, { token: null });
        return { message: 'logout successfully' };
    }
};
AdminService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(admin_entity_1.Admin)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        jwt_1.JwtService])
], AdminService);
exports.AdminService = AdminService;
//# sourceMappingURL=admin.service.js.map