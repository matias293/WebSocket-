import { Router } from 'express';
import productsRouter from './productos';


const router = Router();

router.use('/', productsRouter);


export default router;