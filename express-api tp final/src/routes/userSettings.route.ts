import { Router } from "express";
import { UserSettingsController } from "../modules/userSettings/userSettings.controller";
import { UserSettingsService } from "../modules/userSettings/userSettings.service";
import { UserSettingsRepository } from "../modules/userSettings/userSettings.repository";
import { authWithHeadersMiddleware } from "../middleware/auth.middleware";


const router = Router();
const userSettingsRepository = new UserSettingsRepository();
const userSettingsService = new UserSettingsService(userSettingsRepository);
const userSettingsController = new UserSettingsController(userSettingsService);

router.get("/:id", authWithHeadersMiddleware, userSettingsController.getUserSettingsById);
router.post("/", authWithHeadersMiddleware, userSettingsController.createUserSettings);
router.put("/:id", authWithHeadersMiddleware, userSettingsController.updateUserSettings);

//export const userSettingsRoutes = router;
export { router as userSettingsRoutes };