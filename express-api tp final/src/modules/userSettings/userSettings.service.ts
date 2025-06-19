import { UserSettings } from "../../types"; 
import { UserSettingsRepository } from "./userSettings.repository";
export class UserSettingsService {
  constructor(private readonly userSettingsRepository: UserSettingsRepository) {}

  async getUserSettings(userId: string): Promise<UserSettings | undefined> {
    return this.userSettingsRepository.getUserSettingsById(userId);
  }

 async updateUserSettings(
  userId: string,
  refreshInterval?: number,
  showUppercase?: boolean
): Promise<UserSettings> {
    const settings: Partial<UserSettings> = {};
    if (refreshInterval !== undefined) settings.refresh_interval = refreshInterval;
    if (showUppercase !== undefined) settings.show_uppercase = showUppercase;

    return this.userSettingsRepository.updateUserSettings(userId, settings);
}

    async createUserSettings(
        userId: string,
        refreshInterval: number,
        showUppercase: boolean
    ): Promise<UserSettings> {
        return this.userSettingsRepository.createUserSettings(userId, refreshInterval, showUppercase);
    }
}