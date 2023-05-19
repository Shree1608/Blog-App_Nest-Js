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
exports.JwtAdminSrategy = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const typeorm_1 = require("@nestjs/typeorm");
const passport_jwt_1 = require("passport-jwt");
const admin_entity_1 = require("../../admin/entities/admin.entity");
const user_entity_1 = require("../../user/entities/user.entity");
const typeorm_2 = require("typeorm");
let JwtAdminSrategy = class JwtAdminSrategy extends (0, passport_1.PassportStrategy)(passport_jwt_1.Strategy) {
    constructor(adminRepo, userRepo) {
        super({
            jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.JWT_SECRET
        });
        this.adminRepo = adminRepo;
        this.userRepo = userRepo;
    }
    async validate(payload) {
        const { id } = payload;
        console.log(id);
        const findadmin = await this.adminRepo.findBy({ id: id });
        if (findadmin[0] == null) {
            const finduser = await this.userRepo.findBy({ id: id });
            console.log(finduser);
            if (finduser[0].token == null) {
                throw new common_1.UnauthorizedException('login first');
            }
            return finduser;
        }
        return findadmin;
    }
};
JwtAdminSrategy = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(admin_entity_1.Admin)),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], JwtAdminSrategy);
exports.JwtAdminSrategy = JwtAdminSrategy;
//# sourceMappingURL=jwt.strategy.js.map