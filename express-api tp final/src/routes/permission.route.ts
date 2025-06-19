import { Router } from "express";
import { PermissionRepository } from "../modules/permission/permission.repository";
import { PermissionService } from "../modules/permission/permission.service";   
import { PermissionController } from "../modules/permission/permission.controller";
import { authWithHeadersMiddleware } from "../middleware/auth.middleware";

const router = Router();
const permissionRepository = new PermissionRepository();
const permissionService = new PermissionService(permissionRepository);
const permissionController = new PermissionController(permissionService);

router.get("/", authWithHeadersMiddleware, permissionController.getAllPermissions);
router.get("/:id", authWithHeadersMiddleware, permissionController.getPermissionById);
router.post("/", authWithHeadersMiddleware, permissionController.createPermission);
router.delete("/:id", authWithHeadersMiddleware, permissionController.removePermission);
router.put("/:id", authWithHeadersMiddleware, permissionController.changeAccessLevel); //en el endpoint mandar un json el nuevo cambio de access_level

export { router as permissionRoutes };