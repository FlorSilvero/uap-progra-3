import {database} from '../../db/connection';
import {Reminder, CreateReminderRequest} from '../../types';
import {v4 as uuidv4} from 'uuid';

export class ReminderRepository {
  async getAllReminders(board_id:string): Promise<Reminder[]> {
    return database.all<Reminder>('SELECT * FROM reminders WHERE board_id = ?',  [board_id]);
  }

  async getReminderById(id: string): Promise<Reminder | undefined> {
    return database.get<Reminder>('SELECT * FROM reminders WHERE id = ?', [id]);
  }

  async createReminder(reminderData: CreateReminderRequest): Promise<Reminder> {
    const id = uuidv4();
    const now = new Date().toISOString();

  await database.run(
  'INSERT INTO reminders (id, name, completed, board_id, created_by, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?)',
  [id, reminderData.name, reminderData.completed, reminderData.board_id, reminderData.created_by, now, now]
);


    const reminder = await this.getReminderById(id);
    if (!reminder) {
      throw new Error('Failed to create reminder');
    }

    return reminder;
  }

  async deleteReminder(id: string): Promise<boolean> {
    await database.run('DELETE FROM reminders WHERE id = ?', [id]);
    return true;
  }

  async reminderExists(id: string): Promise<boolean> {
    const reminder = await this.getReminderById(id);
    return !!reminder;
  }
}