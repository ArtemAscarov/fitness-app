enum ROLES {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

export type User = {
  id: number;
  email: string;
  role: ROLES;
};
