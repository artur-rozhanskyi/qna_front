export interface User {
  id: number;
  email: string;
  role: string;
  profile: {
    id: number;
    first_name: string;
    last_name: string;
  };
}
