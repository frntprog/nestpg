import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './modules/users/user.entity';
import { TasksModule } from './modules/tasks/tasks.module';
import { Task } from './modules/tasks/task.entity';
import { TaskGroups } from './modules/groups/groups.module';
import { TaskGroup } from './modules/groups/task-group.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'Aezakmi37$',
      database: 'nestsimp',
      entities: [User, Task, TaskGroup], // or use glob: __dirname + '/../**/*.entity{.ts,.js}'
      synchronize: true,
    }),
    UsersModule,
    TasksModule,
    TaskGroups,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
