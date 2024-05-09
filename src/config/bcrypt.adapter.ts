import { compareSync, genSaltSync, hashSync } from 'bcryptjs';


/**
 * Wrapper for the bcrypt library in order to not use its methods directly and to only have one point of failure if the library is updated
 */
export const bcryptAdapter = {

  /**
   * Returns the hash of a given password.
   *
   * @param password - The password to hash
   * @returns The hashed password
   *
   */
  hash: (password: string) => {
    const salt = genSaltSync();
    return hashSync(password, salt)
  },

  /**
   * Compares a plain password against a hashed one.
   *
   * @param password - The plain text password
   * @param hashed - The hashed password
   * @returns True if matching, false in any other case
   *
   */
  compare: (password:string, hashed: string) => {
    return compareSync(password, hashed);
  }

}