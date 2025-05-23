import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TagsModule } from './tags/tags.module';
import { FinancialRecordsModule } from './financialRecords/financialRecords.module';
import { SummaryModule } from './summary/summary.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const dbUrl = configService.get<string>('SUPABASE_DB_URL');
        return dbUrl
          ? {
              type: 'postgres',
              url: dbUrl,
              entities: [__dirname + '/**/*.entity{.ts,.js}'],
              synchronize: process.env.NODE_ENV !== 'production',
              ssl:
                process.env.NODE_ENV === 'production'
                  ? true
                  : { rejectUnauthorized: false },
            }
          : {
              type: 'postgres',
              host: configService.get('SUPABASE_DB_HOST'),
              port: configService.get('SUPABASE_DB_PORT'),
              username: configService.get('SUPABASE_DB_USER'),
              password: configService.get('SUPABASE_DB_PASSWORD'),
              database: configService.get('SUPABASE_DB_NAME'),
              entities: [__dirname + '/**/*.entity{.ts,.js}'],
              synchronize: process.env.NODE_ENV !== 'production',
              ssl:
                process.env.NODE_ENV === 'production'
                  ? true
                  : { rejectUnauthorized: false },
            };
      },
    }),
    AuthModule,
    UsersModule,
    TagsModule,
    FinancialRecordsModule,
    SummaryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
