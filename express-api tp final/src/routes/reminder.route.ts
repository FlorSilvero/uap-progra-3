import { Router } from "express";
import { ReminderRepository } from "../modules/reminder/reminder.repository";
import { ReminderService } from "../modules/reminder/reminder.service";
import { ReminderController } from "../modules/reminder/reminder.controller";
import { authWithHeadersMiddleware } from "../middleware/auth.middleware";

const router = Router();

// Inyección de dependencias
const reminderRepository = new ReminderRepository();
const reminderService = new ReminderService(reminderRepository);
const reminderController = new ReminderController(reminderService);

// Middleware de autenticación para todas las rutas de reminders
router.use(authWithHeadersMiddleware);

// Rutas para Reminders
router.get("/:board_id", reminderController.getAllReminders); // lista por board
router.get("/single/:id", reminderController.getReminderById); // una específica
router.post("/", reminderController.createReminder);
router.delete("/:id", reminderController.deleteReminder);

export { router as reminderRoutes };
