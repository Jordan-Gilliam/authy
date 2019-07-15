import { TypeOrmModuleOptions } from '@nestjs/typeorm';
export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: '',
  port: 8000,
  username: '',
  password: '',
  database: '',
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  synchronize: true,
};
