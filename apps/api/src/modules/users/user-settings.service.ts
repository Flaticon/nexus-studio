// apps/api/src/modules/users/user-settings.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { UserSettings, UserSettingsDocument } from './schemas/user-settings.schema';

export interface UpdateUserSettingsDto {
  fullName?: string;
  role?: string;
  location?: string;
  bio?: string;
  avatar?: string;
  notifications?: {
    email?: boolean;
    push?: boolean;
    sms?: boolean;
    desktop?: boolean;
  };
  appearance?: {
    theme?: string;
    language?: string;
    timezone?: string;
  };
  privacy?: {
    profileVisible?: boolean;
    activityTracking?: boolean;
    dataAnalytics?: boolean;
    thirdPartySharing?: boolean;
  };
  security?: {
    twoFactorAuth?: boolean;
    sessionTimeout?: string;
    loginNotifications?: boolean;
    deviceManagement?: boolean;
  };
}

@Injectable()
export class UserSettingsService {
  constructor(
    @InjectModel(UserSettings.name)
    private userSettingsModel: Model<UserSettingsDocument>,
  ) {}

  async findByUserId(userId: string): Promise<UserSettingsDocument> {
    const objectId = new Types.ObjectId(userId);
    
    let settings = await this.userSettingsModel.findOne({ userId: objectId });
    
    if (!settings) {
      // Create default settings if they don't exist
      settings = new this.userSettingsModel({
        userId: objectId,
        notifications: {},
        appearance: {},
        privacy: {},
        security: {},
      });
      await settings.save();
    }
    
    return settings;
  }

  async updateSettings(
    userId: string,
    updateData: UpdateUserSettingsDto,
  ): Promise<UserSettingsDocument> {
    const objectId = new Types.ObjectId(userId);
    
    const settings = await this.userSettingsModel.findOneAndUpdate(
      { userId: objectId },
      { $set: updateData },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );

    return settings;
  }

  async updateSection(
    userId: string,
    section: string,
    sectionData: any,
  ): Promise<UserSettingsDocument> {
    const objectId = new Types.ObjectId(userId);
    
    const updateField = {};
    updateField[section] = sectionData;
    
    const settings = await this.userSettingsModel.findOneAndUpdate(
      { userId: objectId },
      { $set: updateField },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );

    return settings;
  }

  async deleteSettings(userId: string): Promise<void> {
    const objectId = new Types.ObjectId(userId);
    const result = await this.userSettingsModel.deleteOne({ userId: objectId });
    
    if (result.deletedCount === 0) {
      throw new NotFoundException('User settings not found');
    }
  }
}