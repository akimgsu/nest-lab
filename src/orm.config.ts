import { TypeOrmModuleOptions } from '@nestjs/typeorm';

function ormConfig(): TypeOrmModuleOptions {
    const commonConf = {
        SYNCRONIZE: false,
        ENTITIES: [__dirname + '/domain/*.entity{.ts,.js}'],
        MIGRATIONS: [__dirname + '/migrations/**/*{.ts,.js}'],
        CLI: {
            migrationsDir: 'src/migrations',
        },
        MIGRATIONS_RUN: false,
    };

    const ormconfig: TypeOrmModuleOptions = {
        name: 'default',
        type: 'mysql',
        database: 'test',
        host: 'localhost',
        port: 13306,
        username: process.env.MYSQL_ROOT_USER,
        password: process.env.MYSQL_ROOT_PASS,
        logging: true,
        synchronize: commonConf.SYNCRONIZE,
        entities: commonConf.ENTITIES,
        migrations: commonConf.MIGRATIONS,
        migrationsRun: commonConf.MIGRATIONS_RUN
    };

    return ormconfig;
}

export { ormConfig };