import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { CatsModule } from './cats/cats.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cat } from './domain/cats.entity';
import { AuthModule } from './auth/auth.module';
import { User } from './domain/user.entity';
import { UserAuthority } from './domain/user-authority.entity';
import { ormConfig } from './orm.config';


@Module({
  imports: [TypeOrmModule.forRootAsync({ useFactory: ormConfig }), UsersModule, CatsModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
