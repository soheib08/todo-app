export interface IJwtService {
  generateToken(payload: string): Promise<string>;
  verifyToken(token: string): Promise<boolean>;
}
export const IJwtService = Symbol('IJwtService');
