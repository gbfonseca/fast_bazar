import { Router } from 'express';
import { getRepository } from 'typeorm';
import CreateUserService from '../services/CreateUserService';
import UpdateUserService from '../services/UpdateUserService';
import { User } from '../models/User';

const userRoutes = Router();

userRoutes.post('/', async (request, response) => {

  const { name, email, username, password , address_street, address_number, address_state, address_city, address_complement, address_zip_code } = request.body;

  const createUser = new CreateUserService();

  const user = await createUser.execute({
    name,
    email,
    username,
    password,
    address_street,
    address_number,
    address_state,
    address_city,
    address_complement,
    address_zip_code
  });

  return response.json(user);

});

userRoutes.get('/', async (request, response) => {
  const userRepository = getRepository(User);

  const users = await userRepository.find();

  response.json(users);
});

userRoutes.get('/:id', async (request, response) => {

  const { id } = request.params;

  const userRepository = getRepository(User);

  const user = await userRepository.findOne(id);

  response.json(user);
});

userRoutes.put('/:id', async (request, response) => {
  const { id } = request.params;
  const userService = new UpdateUserService();

  const user = await userService.execute(id, request.body);

  return response.json(user);

});

userRoutes.delete('/:id', async (request, response) => {
  const { id } = request.params;
  const usersRepository = getRepository(User);

  await usersRepository.delete(id);

  return response.json({
    message: 'User has been removed.'
  });

});

export default userRoutes;