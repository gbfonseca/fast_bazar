import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { User } from '../models/User';
import authConfig from '../config/auth';

interface Request {
  email: string;
  password: string;
}

interface Response {
  token: string;
  user: User;
}

export default class AuthenticationService {
  public async execute({email, password}: Request): Promise<Response> {
    const userRepository = getRepository(User);

    const user = await userRepository.findOne({where: { email }});

    if(!user) {
      throw new Error('Incorret email/password combination');
    }

    const passwordMatched = compare(password, user.password);

    if(!passwordMatched) {
      throw new Error('Incorret email/password combination');
    }

    const { SECRET_KEY, EXPIRES_IN } = authConfig.jwt;

    const token = sign({  }, SECRET_KEY, {
      expiresIn: EXPIRES_IN
    });

    return {
      token,
      user
    }
  }
}