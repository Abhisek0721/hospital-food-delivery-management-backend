// src/auth/roles.decorator.ts
import { SetMetadata } from '@nestjs/common';

// Define a custom metadata key for roles
export const ROLES_KEY = 'roles';

// Define the decorator
export const AllowRoles = (...roles: string[]) => SetMetadata(ROLES_KEY, roles);
