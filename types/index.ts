export interface AdminType {
  user: User;
  expires: string;
}
export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  status: boolean;
}
