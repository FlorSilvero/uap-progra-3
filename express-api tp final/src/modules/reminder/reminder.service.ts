import { Board, CreateReminderRequest, Reminder } from "../../types";
import { ReminderRepository } from "./reminder.repository";

export class ReminderService {
  constructor(private readonly reminderRepository: ReminderRepository) {}

  async getAllReminders(board_id: string): Promise<Reminder[]> {
    //const reminders = await this.reminderRepository.getAllReminders(board_id);
    //return reminders;
    console.log("Ejecutando consulta con board_id =", board_id);
    return this.reminderRepository.getAllReminders(board_id);
  }

  async getReminderById(id: string): Promise<Reminder | undefined> {
    return this.reminderRepository.getReminderById(id);
  }

  async createReminder(reminderData: CreateReminderRequest, userId: string): Promise<Reminder> {
    const reminderRequest = { ...reminderData, created_by: userId };
    return this.reminderRepository.createReminder(reminderRequest);
  }

  async deleteReminder(id: string): Promise<boolean> {
    return this.reminderRepository.deleteReminder(id);
  }
}