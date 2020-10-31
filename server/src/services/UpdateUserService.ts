import { getRepository} from 'typeorm';
import { hash } from 'bcryptjs';
import { User } from '../models/User';

interface Request {
  name: string;
  email: string;
  username: string;
  password: string;
  address_street: string;
  address_number: string;
  address_state: string;
  address_city: string;
  address_complement: string;
  address_zip_code: string;
}

export default class CreateUserService {
  public async execute(user_id: string, data: Request): Promise<User> {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne(user_id);
    if (!user) {
      throw new Error('User not found.');
    }

    usersRepository.merge(user, data);

    await usersRepository.save(user);

    return user;
    
  }
}
