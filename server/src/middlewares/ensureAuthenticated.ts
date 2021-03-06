import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import authConfig from '../config/auth';

interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default function EnsureAuthenticated(request: Request, response: Response, next: NextFunction) {
  const authHeader = request.headers.authorization;

  if(!authHeader) {
    throw new Error('JWT is missing.');
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = verify(token, authConfig.jwt.SECRET_KEY);

    const { sub } = decoded as TokenPayload;

    request.user = {
      id: sub,
    }

    return next();

  } catch {
    throw new Error('JWT is invalid.')
  }

}