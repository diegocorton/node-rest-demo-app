import mongoose from 'mongoose';



interface Options {
  mongoUrl: string;
  dbName: string;
}

/**
 * Class to manage the connection to MongoDB. Wraps the mongoose library to only have a single point of failure if the library changes
 */
export class MongoDatabase {

  static async connect( options: Options ) {
    const { mongoUrl, dbName } = options;

    try {
      await mongoose.connect( mongoUrl, {
        dbName: dbName,
      });

      return true;

    } catch (error) {
      console.log('Mongo connection error');
      throw error;
    }

  }


}





