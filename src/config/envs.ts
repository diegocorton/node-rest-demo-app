import 'dotenv/config'
import { get } from 'env-var';

/**
 * Wrapper for the dotenv and env-var libraries in order to not use its methods directly and to only have one point of failure if the library is updated
 */
export const envs = {

  PORT: get('PORT').required().asPortNumber(),
  
  MONGO_URL: get('MONGO_URL').required().asString(),
  MONGO_DB_NAME: get('MONGO_DB_NAME').required().asString(),

  JWT_SEED: get('JWT_SEED').required().asString(),

}