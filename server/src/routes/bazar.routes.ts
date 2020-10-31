import { getRepository } from 'typeorm';
import { Router } from 'express';
import { Bazar } from '../models/Bazar';
import UpdateBazarService from '../services/UpdateBazarService';
import EnsureAuthenticated from '../middlewares/ensureAuthenticated';

const bazarRoutes = Router();

bazarRoutes.use(EnsureAuthenticated);

bazarRoutes.post('/', async (request, response) => { 

  const { name, address_street, address_number, address_state, address_city, address_complement, address_zip_code, phone, user_id } = request.body;

  const bazarRepository = getRepository(Bazar);

  const bazar = bazarRepository.create({
    name,
    address_street,
    address_number,
    address_state,
    address_city,
    address_complement,
    address_zip_code,
    phone,
    user_id
  });

  await bazarRepository.save(bazar);

  return response.json(bazar);

});

bazarRoutes.get('/', async (request, response) => {
  const bazarRepository = getRepository(Bazar);

  const bazars = await bazarRepository.find();

  return response.json(bazars);
});

bazarRoutes.get('/:id', async (request, response) => {
  const {id} = request.params;
  const bazarRepository = getRepository(Bazar);

  const bazar = await bazarRepository.findOne(id);

  return response.json(bazar);
});

bazarRoutes.put('/:id', async (request, response) => {
  const {id} = request.params;
  
  const bazarService = new UpdateBazarService();

  const bazar = await bazarService.execute(id, request.body);

  return response.json(bazar);
});

bazarRoutes.delete('/:id', async (request, response) => {
  const {id} = request.params;
  const bazarRepository = getRepository(Bazar);

  const bazar = await bazarRepository.findOne(id);

  await bazarRepository.delete(id);

  return response.json({
    message: 'Bazar been removed.'
  });
});

export default bazarRoutes;