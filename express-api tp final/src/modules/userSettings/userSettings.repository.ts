//Este repository maneja la persistencia de las configuraciones del usuario para sus boards.
import { database } from "../../db/connection";
import { UserSettings} from "../../types";
import { v4 as uuidv4 } from "uuid";

export class UserSettingsRepository {
  // Obtiene todas las configuraciones de usuario
  async getUserSettingsById(userId: string): Promise<UserSettings | undefined> {
    return database.get<UserSettings>("SELECT * FROM usersettings WHERE user_id = ?", [userId]);
  }

  // crea una nueva configuración de usuario 
async createUserSettings(
  userId: string,
  refreshInterval: number,
  showUppercase: boolean
): Promise<UserSettings> {
    const id = uuidv4();
    const now = new Date().toISOString();

  await database.run(
  `MERGE usersettings AS target
   USING (SELECT ? AS user_id, ? AS refresh_interval, ? AS show_uppercase, ? AS created_at, ? AS updated_at) AS source
   ON target.user_id = source.user_id
   WHEN MATCHED THEN 
     UPDATE SET refresh_interval = source.refresh_interval,
                show_uppercase = source.show_uppercase,
                updated_at = source.updated_at
   WHEN NOT MATCHED THEN
     INSERT (user_id, refresh_interval, show_uppercase, created_at, updated_at)
     VALUES (source.user_id, source.refresh_interval, source.show_uppercase, source.created_at, source.updated_at);`,
  [userId, refreshInterval, showUppercase, now, now]

);

  const createdSettings = await this.getUserSettingsById(userId);
  if (!createdSettings) {
    throw new Error("Failed to create user settings");
  }
  return createdSettings;
}
// Actualiza la configuración del usuario
async updateUserSettings(userId: string, settings: Partial<UserSettings>): Promise<UserSettings> {
    const now = new Date().toISOString();

    // Construir la consulta dinámicamente según los campos presentes en settings
    const fields: string[] = [];
    const values: any[] = [];

    if (settings.refresh_interval !== undefined) {
        fields.push("refresh_interval = ?");
        values.push(settings.refresh_interval);
    }
    if (settings.show_uppercase !== undefined) {
        fields.push("show_uppercase = ?");
        values.push(settings.show_uppercase);
    }

    fields.push("updated_at = ?");
    values.push(now);

    values.push(userId);

    await database.run(
      `UPDATE usersettings SET ${fields.join(", ")} WHERE user_id = ?`,
      values
    );

    const updatedSettings = await this.getUserSettingsById(userId);
    if (!updatedSettings) {
      throw new Error("Failed to update user settings");
    }

    return updatedSettings;
}
}