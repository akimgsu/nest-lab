import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FindOneOptions, Repository } from 'typeorm';
import { UserDTO } from "./dto/user.dto";
import { User } from "./entity/user.entity";


@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) { }

    async findByFields(options: FindOneOptions<UserDTO>): Promise<UserDTO | undefined> {
        return await this.userRepository.findOne(options);
    }

    async save(userDTO: UserDTO): Promise<UserDTO | undefined> {
        return await this.userRepository.save(userDTO);
    }

}