import { JwtAdapter, bcryptAdapter } from '../../config';
import { UserModel } from '../../data';
import { CustomError, LoginUserDto, RegisterUserDto, UserEntity } from '../../domain';



/**
 * Service that implements the business logic for the authentication operations
 */
export class AuthService {

  constructor() {}

  /**
   * Registers a user in the system.
   *
   * @param registerUserDto - The DTO containing the user information
   * @returns An object containing the user from DB and its JWT token
   *
   */
  public async registerUser( registerUserDto: RegisterUserDto ) {

    const existUser = await UserModel.findOne({ email: registerUserDto.email });
    if ( existUser ) throw CustomError.badRequest('Email already exists');

    try {
      const user = new UserModel(registerUserDto);
      
      user.password = bcryptAdapter.hash( registerUserDto.password );
      
      await user.save();

      const { password, ...userEntity } = UserEntity.fromObject(user);

      const token = await JwtAdapter.generateToken({ id: user.id, email: user.email });
      if ( !token ) throw CustomError.internalServer('Error while creating JWT');

      return { 
        user: userEntity, 
        token: token 
      };

    } catch (error) {
      throw CustomError.internalServer(`${ error }`);
    }

  }

  /**
   * Logs a user in the system.
   *
   * @param loginUserDto - The DTO containing the login information
   * @returns An object containing the user from DB and its JWT token
   *
   */
  public async loginUser( loginUserDto: LoginUserDto ) {

    const user = await UserModel.findOne({ email: loginUserDto.email });
    if (!user) throw CustomError.badRequest('Email does not exist');

    const isMatching = bcryptAdapter.compare( loginUserDto.password, user.password );
    if ( !isMatching ) throw CustomError.badRequest('Password is not valid');


    const { password, ...userEntity} = UserEntity.fromObject( user );
    
    const token = await JwtAdapter.generateToken({ id: user.id, email: user.email });
    if ( !token ) throw CustomError.internalServer('Error while creating JWT');

    return {
      user: userEntity,
      token: token,
    }

  }


}