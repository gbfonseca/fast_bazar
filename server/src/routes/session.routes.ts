import { Router } from 'express';
import AuthenticationService from '../services/AuthenticationService';

const sessionRoutes = Router();

sessionRoutes.post('/', async (request, response) => {
  const { email, password } = request.body;

  const authService = new AuthenticationService();

  const {user, token} = await authService.execute({email, password});

  return response.json({
    user,
    token
  });
  
});

export default sessionRoutes;