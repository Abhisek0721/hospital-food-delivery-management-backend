// src/auth/roles.guard.ts
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/allowRole.decorator';
import { UserRole } from '@prisma/client';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // Get the roles from the metadata
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );
    if (!requiredRoles) {
      return true; // No roles specified means the route is public
    }

    // Get the user from the request
    const { user } = context.switchToHttp().getRequest();

    // Check if the user's role is in the required roles
    if (requiredRoles.includes(user.role) || user.role === UserRole.ADMIN) {
      return true;
    }

    // Throw a forbidden exception if the user's role is not allowed
    throw new ForbiddenException(
      'You do not have permission to access this resource.',
    );
  }
}
