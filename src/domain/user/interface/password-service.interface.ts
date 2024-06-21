export interface IPasswordService {
  hash(password: string): Promise<string>;
  compare(password: string, hashPassword: string): Promise<boolean>;
}

export const IPasswordService = Symbol('IPasswordService');
