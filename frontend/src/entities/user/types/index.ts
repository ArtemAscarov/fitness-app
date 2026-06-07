enum ROLES {
  ADMIN,
  USER,
}

export type User = {
  id: number;
  email: string;
  role: ROLES;
};
