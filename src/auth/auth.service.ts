import { HttpException, Injectable, HttpStatus, UnauthorizedException } from '@nestjs/common';
import { UserDTO } from './dto/user.dto';
import { UserService } from './user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService
    ) { }

    async registerNewUser(newUser: UserDTO): Promise<UserDTO> {
        let userFind: UserDTO = await this.userService.findByFields({ where: { username: newUser.username } });
        if (userFind) {
            throw new HttpException('Username already used!', HttpStatus.BAD_REQUEST);
        }
        return this.userService.save(newUser);
    }
    async validateUser(user: UserDTO): Promise<string | undefined> {
        let userFind: UserDTO = await this.userService.findByFields({ where: { username: user.username } });
        const validPassword = await bcrypt.compare(user.password, userFind.password);
        if (!userFind || !validPassword) {
            throw new UnauthorizedException();
        }
        return "loginSuccess!";
    }
}
