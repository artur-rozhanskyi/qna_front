export interface User {
  id: number;
  email: string;
  role: string;
  profile: {
    id: number;
    firstName: string;
    lastName: string;
  };
}
