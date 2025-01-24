import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('postgres.host'),
        port: configService.get<number>('postgres.port'),
        username: configService.get<string>('postgres.username'),
        password: configService.get<string>('postgres.password'),
        database: configService.get<string>('postgres.dbname'),
        // entities: [User, Role], // Aquí puedes agregar tus entidades como User, etc.
        synchronize: false, // Cambia esto a false en producción para evitar perder datos
        autoLoadEntities: true,
        migrations: ['src/modules/database/migrations/*.ts'],
      }),
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
