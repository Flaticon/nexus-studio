// apps/api/src/modules/users/users.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';
import { UserSettings, UserSettingsSchema } from './schemas/user-settings.schema';
import { UsersService } from './users.service';
import { UserSettingsService } from './user-settings.service';
import { UserSettingsController } from './user-settings.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: UserSettings.name, schema: UserSettingsSchema },
    ]),
  ],
  controllers: [UserSettingsController],
  providers: [UsersService, UserSettingsService],
  exports: [UsersService, UserSettingsService],
})
export class UsersModule {}