// apps/web/src/lib/api/user-settings.ts
import { apiClient } from './client';

export interface UserSettings {
  _id?: string;
  userId: string;
  fullName?: string;
  role?: string;
  location?: string;
  bio?: string;
  avatar?: string;
  notifications: {
    email: boolean;
    push: boolean;
    sms: boolean;
    desktop: boolean;
  };
  appearance: {
    theme: string;
    language: string;
    timezone: string;
  };
  privacy: {
    profileVisible: boolean;
    activityTracking: boolean;
    dataAnalytics: boolean;
    thirdPartySharing: boolean;
  };
  security: {
    twoFactorAuth: boolean;
    sessionTimeout: string;
    loginNotifications: boolean;
    deviceManagement: boolean;
  };
  createdAt?: string;
  updatedAt?: string;
}

export interface UpdateUserSettingsDto {
  fullName?: string;
  role?: string;
  location?: string;
  bio?: string;
  avatar?: string;
  notifications?: Partial<UserSettings['notifications']>;
  appearance?: Partial<UserSettings['appearance']>;
  privacy?: Partial<UserSettings['privacy']>;
  security?: Partial<UserSettings['security']>;
}

export const userSettingsApi = {
  // Get user settings
  getUserSettings: async (userId: string): Promise<UserSettings> => {
    return apiClient.get(`/user-settings/${userId}`);
  },

  // Update all settings
  updateUserSettings: async (userId: string, settings: UpdateUserSettingsDto) => {
    return apiClient.put(`/user-settings/${userId}`, settings);
  },

  // Update specific section
  updateSettingsSection: async (userId: string, section: string, data: any) => {
    return apiClient.put(`/user-settings/${userId}/${section}`, data);
  },

  // Delete settings
  deleteUserSettings: async (userId: string) => {
    return apiClient.delete(`/user-settings/${userId}`);
  },
};

// Mock user ID for development - in production this would come from auth
export const MOCK_USER_ID = '507f1f77bcf86cd799439011';