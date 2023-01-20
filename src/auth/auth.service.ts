import { HttpException, Injectable, HttpStatus, UnauthorizedException } from '@nestjs/common';
import { UserDTO } from './dto/user.dto';
import { UserService } from './user.service';
import * as bcrypt from 'bcrypt';
import { Payload } from './dto/payload.interface';
import { User } from './entity/user.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService
    ) { }

    async registerNewUser(newUser: UserDTO): Promise<UserDTO> {
        let userFind: UserDTO = await this.userService.findByFields({ where: { username: newUser.username } });
        if (userFind) {
            throw new HttpException('Username already used!', HttpStatus.BAD_REQUEST);
        }
        return this.userService.save(newUser);
    }
    async validateUser(user: UserDTO): Promise<{ accessToken: string } | undefined> {
        let userFind: User = await this.userService.findByFields({ where: { username: user.username } });
        const validPassword = await bcrypt.compare(user.password, userFind.password);
        if (!userFind || !validPassword) {
            throw new UnauthorizedException();
        };
        this.convertInAuthorities(userFind);
        const payload: Payload = {
            id: userFind.id,
            username: userFind.username,
            authorities: userFind.authorities
        };
        return { accessToken: this.jwtService.sign(payload), }
    }
    async tokenValidateUser(payload: Payload): Promise<User | undefined> {
        const userFind = await this.userService.findByFields({
            where: { id: payload.id }
        });
        this.flatAuthorities(userFind);
        return userFind;
    }

    private flatAuthorities(user: any): User {
        if (user && user.authorities) {
            const authorities: string[] = [];
            user.authorities.forEach(authority => authorities.push(authority.authorityName));
            user.authorities = authorities;
        }
        return user;
    }

    private convertInAuthorities(user: any): User {
        if (user && user.authorities) {
            const authorities: any[] = [];
            user.authorities.forEach(authority => authorities.push({ name: authority.authorityName }));
            user.authorities = authorities;
        }
        return user;
    }

}
