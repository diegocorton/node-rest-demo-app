import { Request, Response } from 'express';
import { CustomError, LoginUserDto, RegisterUserDto } from '../../domain';
import { AuthService } from '../services/auth.service';


/**
 * Controller for the authentication server exposing various operations
 */
export class AuthController {

  constructor(
    public readonly authService: AuthService,
  ) {}

  /**
   * Returns a response in case of errors in an operation. When a custom error is present, 
   * it is used to create the response; if there is no custom error, a default error response is generated.
   *
   * @param error - An error
   * @param res - The REST response
   * @returns The REST response with the error
   *
   */
  private handleError = (error: unknown, res: Response ) => {
    if ( error instanceof CustomError ) {
      return res.status(error.statusCode).json({ error: error.message });
    }

    console.log(`${ error }`);
    return res.status(500).json({ error: 'Internal server error' })
  } 

  /**
   * Registers a user in the system.
   *
   * @param req - The REST request
   * @param res - The REST response
   * @returns The REST response for the operation
   *
   */
  registerUser = (req: Request, res: Response) => {
    const [error, registerDto] = RegisterUserDto.create(req.body);
    if ( error ) return res.status(400).json({error})


    this.authService.registerUser(registerDto!)
      .then( (user) => res.json(user) )
      .catch( error => this.handleError(error, res) );
      
  }

  /**
   * Logs a user in the system.
   *
   * @param req - The REST request
   * @param res - The REST response
   * @returns The REST response for the operation
   *
   */
  loginUser = (req: Request, res: Response) => {

    const [error, loginUserDto] = LoginUserDto.create(req.body);
    if ( error ) return res.status(400).json({error})


    this.authService.loginUser(loginUserDto!)
      .then( (user) => res.json(user) )
      .catch( error => this.handleError(error, res) );
      
  }


}