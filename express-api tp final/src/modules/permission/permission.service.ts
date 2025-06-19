import { Permission } from "../../types";
import { PermissionRepository } from "./permission.repository";
 export class PermissionService {
   constructor(private readonly permissionRepository: PermissionRepository) {}

   async getAllPermissions(): Promise<Permission[]> {
     return this.permissionRepository.getAllPermissions();
   }

   async getPermissionById(id: string): Promise<Permission | undefined> {
     return this.permissionRepository.getPermissionById(id);
   }

   async getByUserAndBoard(userId: string, boardId: string): Promise<Permission | undefined> {
     return this.permissionRepository.getByUserAndBoard(userId, boardId);
   }

   async createPermission(permissionData: Omit<Permission, 'id' | 'created_at' | 'updated_at'>): Promise<Permission> {
     return this.permissionRepository.createPermission(permissionData);
   }

   async deletePermission(id: string): Promise<boolean> {
     return this.permissionRepository.deletePermission(id);
   }

   async changeAccessLevel(id: string, access_level: string): Promise<Permission> {
     return this.permissionRepository.update(id, access_level);
   }
 }