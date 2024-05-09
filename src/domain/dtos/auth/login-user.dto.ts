import { regularExps } from '../../../config';



/**
 * DTO for the login operation. Includes validation of parameters.
 */
export class LoginUserDto {

  private constructor(
    public email: string,
    public password: string,
  ) {}

  static create( object: { [key:string]:any } ): [string?, LoginUserDto?] {
    const { email, password } = object;

    if ( !email ) return ['Missing email'];
    if ( !regularExps.email.test( email ) ) return ['Email is not valid'];
    if ( !password ) return ['Missing password'];

    return [undefined, new LoginUserDto(email, password)];

  }


}