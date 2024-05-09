import { Router } from 'express';
import { Authroutes } from './auth/routes';



/**
 * Router for the application.
 */
export class AppRoutes {

  static get routes(): Router {

    const router = Router();
    
    router.use('/api/auth', Authroutes.routes );

    return router;
  }


}

