import { Request, Response } from "express";
import { ReminderService } from "./reminder.service";
import { CreateReminderRequest } from "../../types";
export class ReminderController {
  constructor(private readonly reminderService: ReminderService) {}

  getAllReminders = async (req: Request, res: Response): Promise<void> => {
    try {
      const board_id  = req.params.board_id;
      console.log("board_id param:", req.params.board_id);

      const reminders = await this.reminderService.getAllReminders(board_id);
      console.log("Retrieved reminders:", reminders);
      res.json({ reminders });
    } catch (error) {
      console.error("Error getting reminders:", error);
      res.status(500).json({ error: "Failed to retrieve reminders" });
    }
  };

  getReminderById = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const reminder = await this.reminderService.getReminderById(id);

      if (!reminder) {
        res.status(404).json({ error: "Reminder not found" });
        return;
      }

      res.json({ reminder });
    } catch (error) {
      console.error("Error getting reminder:", error);
      res.status(500).json({ error: "Failed to retrieve reminder" });
    }
  };

  createReminder = async (req: Request, res: Response): Promise<void> => {
    try {
      const userId = req.user.id;
      if (!userId) {
        res.status(401).json({ error: "Unauthorized" });
        return;
      }

      const reminderData: CreateReminderRequest = req.body;

      if (!reminderData.name || !reminderData.board_id) {
        res.status(400).json({ error: "Name and board_id are required" });
        return;
      }

      const reminder = await this.reminderService.createReminder(reminderData, userId);
      res.status(201).json({ reminder });
    } catch (error) {
      console.error("Error creating reminder:", error);
      res.status(500).json({ error: "Failed to create reminder" });
    }
  };

  deleteReminder = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const deleted = await this.reminderService.deleteReminder(id);

      if (!deleted) {
        res.status(404).json({ error: "Reminder not found" });
        return;
      }

      res.json({ message: "Reminder deleted successfully" });
    } catch (error) {
      console.error("Error deleting reminder:", error);
      res.status(500).json({error: 'Failed to delete reminder'});
    }
  };
}