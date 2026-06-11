export const ROLES = {
  ADMIN: 'ADMIN',
  EDITOR: 'EDITOR',
} as const;

export type Role = (typeof ROLES)[keyof typeof ROLES];
