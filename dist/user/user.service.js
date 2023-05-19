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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./entities/user.entity");
const typeorm_2 = require("@nestjs/typeorm");
const bcrypt = require("bcrypt");
const jwt_1 = require("@nestjs/jwt");
let UserService = class UserService {
    constructor(userRepository, jwtservice) {
        this.userRepository = userRepository;
        this.jwtservice = jwtservice;
    }
    async userSignup(userRepo) {
        const { firstName, lastName, userName, email, password, age, address } = userRepo;
        const findemail = await this.userRepository.findOneBy({ email });
        if (findemail) {
            throw new common_1.UnauthorizedException('email already exist');
        }
        const hashPass = await bcrypt.hash(password, 10);
        const admin = await this.userRepository.create({
            firstName,
            lastName,
            userName,
            email,
            password: hashPass,
            address,
            age
        });
        return this.userRepository.save(admin);
    }
    async userLogin(userlogin) {
        const { email, password } = userlogin;
        const findemail = await this.userRepository.findOneBy({ email });
        if (!findemail) {
            throw new common_1.NotFoundException('user not found');
        }
        const isPass = await bcrypt.compare(password, findemail.password);
        if (!isPass) {
            throw new common_1.UnauthorizedException('invalid password');
        }
        const token = await this.jwtservice.sign({ id: findemail.id });
        const updatetoken = await this.userRepository.update(findemail.id, { token: token });
        return { token };
    }
    async userLogout(user) {
        console.log(user);
        const logout = this.userRepository.update(user.id, { token: null });
        return { message: 'logout succesfully' };
    }
    async userfind(id) {
        const user = await this.userRepository.findOneBy({ id });
        return user;
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        jwt_1.JwtService])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map