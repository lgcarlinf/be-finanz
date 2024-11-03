import { SetMetadata } from '@nestjs/common';
import { ValidRoles } from '../interfaces/valid-routes.interface';

export const META_ROLES = 'roles';

export const RoleProtected = (...args: ValidRoles[]) => {
  return SetMetadata('roles', args);
};
