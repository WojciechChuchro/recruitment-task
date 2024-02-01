export interface User {
  id?: number;
  email: string;
  name: string;
  surname: string;
  password: string;
  salt: string;
  sessionToken: string | null;
}

export interface Tasks {
  id?: number;
  userId: number;
  isDone: boolean;
  description: string;
}
