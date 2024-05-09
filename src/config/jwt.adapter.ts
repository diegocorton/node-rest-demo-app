import jwt from 'jsonwebtoken';
import { envs } from './envs';

//Seed for the token, obtained from environment variables
const JWT_SEED = envs.JWT_SEED;

/**
 * Wrapper for the jwt library in order to not use its methods directly and to only have one point of failure if the library is updated
 */
export class JwtAdapter {

  /**
   * Generates a JWT token from a payload.
   *
   * @param payload - The base for the JWT token to be generated
   * @param duration - The duration of the token
   * @returns The JWT token
   *
   */
  static async generateToken( payload:any, duration: string = '2h' ) {

    return new Promise((resolve) => {
      jwt.sign(payload, JWT_SEED, { expiresIn: duration }, (err, token) => {
        
        if ( err ) return resolve(null);

        resolve(token)

      });
    })

  }

}

