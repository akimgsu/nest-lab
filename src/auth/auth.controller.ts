import { Body, Controller, Post, Req, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserDTO } from './dto/user.dto';


@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService
    ) { }

    @Post('/register')
    async registerAccount(@Req() req: Request, @Body() userDTO: UserDTO): Promise<any> {
        return await this.authService.registerNewUser(userDTO);
    }
    @Post('/login')
    async login(@Body() userDTO: UserDTO): Promise<any> {
        return await this.authService.validateUser(userDTO);
    }
}
