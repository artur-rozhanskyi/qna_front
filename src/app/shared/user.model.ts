import { Role } from './role';
import { Profile } from './profile.model';

export interface User {
  id: number;
  email: string;
  role: Role;
  profile: Profile;
  error?: any;
}

export interface UserResolved {
  user: User;
  allowEdit?: boolean;
  error?: any;
}
