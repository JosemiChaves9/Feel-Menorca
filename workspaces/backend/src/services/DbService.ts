import { MongoClient, Db, ObjectId, ObjectID } from 'mongodb';
import { User } from '@mallorcabootcamp/bsr-types';
import { getUniqueReservationId } from '../utils/getUniqueReservationId';
import { SpotsQuery } from '../gql';

let db: Db | undefined;
const centsToEurosConversion = 100;

interface Availability {
  spotId: string;
  date: number;
  kayakType: string;
  numKayakAvailability: number;
}

export class DbService {
  static connect() {
    const url = process.env.MONGO_URL;
    const dbName = process.env.DB_NAME;
    return new Promise<void>((res, rej) => {
      const client = new MongoClient(url as string);
      client.connect((err) => {
        if (err) {
          rej(err);
        } else {
          db = client.db(dbName);
          res();
        }
      });
    });
  }

  static getSpots(query: SpotsQuery, limit?: number) {
    return DbService.getDb()
      .collection('spots')
      .find(query)
      .limit(!limit ? 0 : limit)
      .toArray();
  }

  static getSpotById(id: string) {
    return DbService.getDb()
      .collection('spots')
      .findOne({ _id: new ObjectId(id) });
  }

  static async getReservations(userId: any) {
    if (!userId) {
      throw new Error('ERR_NO_USER_LOGGED');
    }
    const reservations = await DbService.getDb()
      .collection('reservations')
      .find(userId)
      .toArray();
    try {
      return reservations.map(async (reservation: any) => {
        const spot = await DbService.getSpotById(reservation.spotId);
        return {
          ...reservation,
          spotName: spot.title,
          spotImageUrl: spot.mainImageUrl,
          spotSlug: spot.slug,
        };
      });
    } catch (e) {
      return new Error(e);
    }
  }

  static getUserFromToken(token: string) {
    return DbService.getDb().collection('users').findOne({ token });
  }

  static getUserFromChangePasswordToken(changePasswordToken: string) {
    return DbService.getDb()
      .collection('users')
      .findOne({ changePasswordToken });
  }

  static getUser(email: string): Promise<User | null> {
    return DbService.getDb().collection('users').findOne({ email });
  }

  static createUser(
    email: string,
    phoneNumber: string,
    password: string,
    token: string
  ) {
    return DbService.getDb()
      .collection('users')
      .insertOne({ email, phoneNumber, password, token });
  }

  static updateTokenOnUser(email: string, token: string) {
    return DbService.getDb()
      .collection('users')
      .findOneAndUpdate({ email }, { $set: { token } });
  }

  static async createReservation(
    timestamp: string,
    userId: string,
    spotId: string,
    kayakReservations: { kayakType: string; duration: string }[],
    paymentId: string,
    priceEur: number
  ): Promise<{ reservationID: string }> {
    const reservationID = await getUniqueReservationId(DbService.getDb());
    if (!reservationID) {
      return Promise.reject(`couldn't get a reservation ID`);
    }
    await DbService.getDb()
      .collection('reservations')
      .insertOne({
        reservationID,
        timestamp,
        userId,
        spotId,
        kayakReservations,
        paymentId,
        priceEur: priceEur / centsToEurosConversion,
      });
    return { reservationID };
  }

  static getSpot(_id: string, slug: string) {
    const value = !!_id ? { _id: new ObjectId(_id) } : { slug };
    return DbService.getDb().collection('spots').findOne(value);
  }

  static setUserChangePasswordToken(
    email: string,
    changePasswordToken: string
  ) {
    return DbService.getDb()
      .collection('users')
      .updateOne({ email }, { $set: { changePasswordToken } });
  }

  static async changeUserPassword(
    password: string,
    changePasswordToken: string
  ) {
    await DbService.getDb()
      .collection('users')
      .updateOne({ changePasswordToken }, { $set: { password } });
    return await DbService.getDb()
      .collection('users')
      .updateOne({ changePasswordToken }, { $unset: { changePasswordToken } });
  }

  static async createOrUpdateMultipleAvailability(
    availabilities: Availability[]
  ) {
    return Promise.all(
      availabilities.map((availability) => {
        return DbService.getDb()
          .collection('availability')
          .updateOne(
            {
              spotId: new ObjectId(availability.spotId),
              date: availability.date,
              kayakType: availability.kayakType,
            },
            {
              $inc: { numKayakAvailability: availability.numKayakAvailability },
            },
            { upsert: true }
          );
      })
    );
  }

  static async getAvailabilities(
    spotId: string,
    startOfToday: number,
    endOfMonth: number
  ): Promise<Availability[]> {
    return await DbService.getDb()
      .collection('availability')
      .find({
        spotId: new ObjectID(spotId),
        date: { $gte: startOfToday, $lte: endOfMonth },
      })
      .toArray();
  }

  private static getDb(): Db {
    if (!db) {
      throw new Error(
        `Can't get DB before connecting. Please, check you're executing connect method`
      );
    }
    return db;
  }
}
