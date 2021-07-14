import { ObjectId } from 'mongodb';

export interface LoginParams {
  email: string;
  phoneNumber: string;
  password: string;
}

export interface KayakReservations {
  kayakType: string;
  duration: string;
}

export interface ReservationParams {
  timestamp: string;
  userId: string;
  spotId: string;
  kayakReservations: KayakReservations[];
  paymentId: string;
  priceEur: number;
}

export interface UserContext {
  user: {
    _id: string;
    email: string;
    password: string;
    token: string;
    companySpotId: string;
  };
}
