import { Role } from './role';

export interface User {
  id: number;
  email: string;
  role: Role;
  profile: {
    id: number;
    firstName: string;
    lastName: string;
  };
}
