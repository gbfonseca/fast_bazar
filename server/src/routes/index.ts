import { Router } from 'express';
import userRoutes from './user.routes';
import bazarRoutes from './bazar.routes';
import productRoutes from './product.routes';
import sessionRoutes from './session.routes';

const router = Router();

router.use('/users', userRoutes);
router.use('/bazars', bazarRoutes);
router.use('/products', productRoutes);
router.use('/sessions', sessionRoutes);

export default router;