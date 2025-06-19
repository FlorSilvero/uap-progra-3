//Controller de las configuraciones del usuario
import { Response, Request } from "express";
import { UserSettingsService } from "./userSettings.service";

export class UserSettingsController {
  constructor(private readonly userSettingsService: UserSettingsService) {}


  getUserSettingsById = async (req: Request, res: Response): Promise<void> => {
    try {
      const id  = req.params.id;
      if (!id) {
        res.status(401).json({ error: "falta id" });
        return;
      }

      const settings = await this.userSettingsService.getUserSettings(id);
      res.json({ settings });
    } catch (error) {
      console.error("Error getting user settings:", error);
      res.status(500).json({ error: "Failed to retrieve user settings" });
    }
  };

  createUserSettings = async (req: Request, res: Response): Promise<void> => {
    try {
      const userId = req.body.user_id;
    const settingsData = req.body;
    
      if (!userId) {
        res.status(401).json({ error: "falta id" });
        return;
      }

      const refreshInterval = req.body.refresh_interval;
      const showUppercase = req.body.show_uppercase;
      console.log("Received settings data:", settingsData);

      if (!settingsData) {
        res.status(400).json({ error: "Settings data is required" });
        return;
      }

      const settings = await this.userSettingsService.createUserSettings(userId,refreshInterval, showUppercase );
      res.status(201).json({ settings });
    } catch (error) {
       if (error instanceof Error) {
        res.status(500).json({ error: error.message || "No se pudo crear configuracionesss" });
      } else {
        res.status(500).json({ error: "No se pudo crear configuracionesss to login" });
      }

    }
  }

    updateUserSettings = async (req: Request, res: Response): Promise<void> => {
        try {
        const userId = req.params.id;
        const refreshInterval = req.body.refresh_interval;
      const showUppercase = req.body.show_uppercase;
        if (!userId) {
            res.status(401).json({ error: "falta id" });
            return;
        }
    
      
    
        if (!refreshInterval && !showUppercase) {
            res.status(400).json({ error: "Settings data is required" });
            return;
        }
    
        const updatedSettings = await this.userSettingsService.updateUserSettings(userId,  refreshInterval, showUppercase );
        res.json({ updatedSettings });
        } catch (error) {
        console.error("Error updating user settings:", error);
        res.status(500).json({ error: "Failed to update user settings" });
        }
    };
}