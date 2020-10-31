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
  public async execute({ name, email, username, password , address_street, address_number, address_state, address_city, address_complement, address_zip_code}: Request): Promise<User> {
    const userRepository = getRepository(User);

    const userIfEmailExists = await userRepository.findOne({ where: { email } });

    if (userIfEmailExists) {
      throw new Error('The email is already being used');
    }

    const userIfUsernameExists = await userRepository.findOne({ where: { username } });

    if (userIfUsernameExists) {
      throw new Error('The username is already being used');
    }

    const hashedPassword = await hash(password, 8);

    const user = userRepository.create({
        name,
        username,
        email,
        password: hashedPassword,
        address_street,
        address_number,
        address_state,
        address_city,
        address_complement,
        address_zip_code
      });

    await userRepository.save(user);

    return user;
    
  }
}
