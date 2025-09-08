// apps/api/src/modules/users/user-settings.controller.ts
import { 
  Controller, 
  Get, 
  Put, 
  Patch, 
  Delete, 
  Body, 
  Param,
  HttpStatus,
  HttpCode,
  UseGuards
} from '@nestjs/common';
import { UserSettingsService, type UpdateUserSettingsDto } from './user-settings.service';

@Controller('user-settings')
export class UserSettingsController {
  constructor(private readonly userSettingsService: UserSettingsService) {}

  @Get(':userId')
  async getUserSettings(@Param('userId') userId: string) {
    return this.userSettingsService.findByUserId(userId);
  }

  @Put(':userId')
  @HttpCode(HttpStatus.OK)
  async updateUserSettings(
    @Param('userId') userId: string,
    @Body() updateData: UpdateUserSettingsDto,
  ) {
    const settings = await this.userSettingsService.updateSettings(userId, updateData);
    return {
      success: true,
      message: 'Settings updated successfully',
      data: settings,
    };
  }

  @Patch(':userId/:section')
  @HttpCode(HttpStatus.OK)
  async updateSettingsSection(
    @Param('userId') userId: string,
    @Param('section') section: string,
    @Body() sectionData: any,
  ) {
    const settings = await this.userSettingsService.updateSection(userId, section, sectionData);
    return {
      success: true,
      message: `${section} settings updated successfully`,
      data: settings,
    };
  }

  @Delete(':userId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteUserSettings(@Param('userId') userId: string) {
    await this.userSettingsService.deleteSettings(userId);
    return {
      success: true,
      message: 'Settings deleted successfully',
    };
  }
}