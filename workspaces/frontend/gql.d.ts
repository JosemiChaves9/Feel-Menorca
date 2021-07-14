export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};


export type Availability = {
  __typename?: 'Availability';
  _id?: Maybe<Scalars['ID']>;
  spotId?: Maybe<Scalars['ID']>;
  date?: Maybe<Scalars['String']>;
  kayakType?: Maybe<Scalars['String']>;
  numKayakAvailability?: Maybe<Scalars['String']>;
};

export enum CacheControlScope {
  Public = 'PUBLIC',
  Private = 'PRIVATE'
}

export type CreateReservationResponse = {
  __typename?: 'CreateReservationResponse';
  reservationID?: Maybe<Scalars['ID']>;
  error?: Maybe<Scalars['String']>;
};

export type GenericResponse = {
  __typename?: 'GenericResponse';
  ok: Scalars['Boolean'];
  error?: Maybe<Scalars['String']>;
};

export type ImageUrls = {
  __typename?: 'ImageUrls';
  imageUrl?: Maybe<Scalars['String']>;
};

export type KayakPricing = {
  __typename?: 'KayakPricing';
  from: Scalars['String'];
  to: Scalars['String'];
  durationName: Scalars['String'];
  durationDescription: Scalars['String'];
  priceEur: Scalars['Float'];
};

export type KayakReservation = {
  __typename?: 'KayakReservation';
  kayakType: Scalars['String'];
  duration: Scalars['String'];
};

export type KayakReservationInput = {
  kayakType: Scalars['String'];
  duration: Scalars['String'];
};

export type KayakType = {
  __typename?: 'KayakType';
  description: Scalars['String'];
  people: Scalars['Int'];
};

export type Location = {
  __typename?: 'Location';
  lat: Scalars['Float'];
  lng: Scalars['Float'];
};

export type LoginResult = {
  __typename?: 'LoginResult';
  ok: Scalars['Boolean'];
  email?: Maybe<Scalars['String']>;
  token?: Maybe<Scalars['String']>;
  tokenExpirationHours?: Maybe<Scalars['Int']>;
  error?: Maybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  signup: LoginResult;
  login: LoginResult;
  createReservation?: Maybe<CreateReservationResponse>;
  changePasswordRequest?: Maybe<GenericResponse>;
  changePassword?: Maybe<GenericResponse>;
  addAvailability?: Maybe<GenericResponse>;
};


export type MutationSignupArgs = {
  email: Scalars['String'];
  phoneNumber: Scalars['String'];
  password: Scalars['String'];
};


export type MutationLoginArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationCreateReservationArgs = {
  timestamp: Scalars['String'];
  spotId: Scalars['String'];
  kayakReservations?: Maybe<Array<KayakReservationInput>>;
  paymentId: Scalars['String'];
};


export type MutationChangePasswordRequestArgs = {
  email: Scalars['String'];
};


export type MutationChangePasswordArgs = {
  newPassword: Scalars['String'];
  changePasswordToken: Scalars['String'];
};


export type MutationAddAvailabilityArgs = {
  startOfDateRangeProvided: Scalars['String'];
  endOfDateRangeProvided: Scalars['String'];
  kayakType: Scalars['String'];
  numKayakAvailability: Scalars['String'];
};

export type PaymentResponse = {
  __typename?: 'PaymentResponse';
  id?: Maybe<Scalars['String']>;
  confirmation?: Maybe<Scalars['Boolean']>;
};

export type Query = {
  __typename?: 'Query';
  spots?: Maybe<Array<Spot>>;
  reservations?: Maybe<Array<Reservation>>;
  spot: Spot;
  user?: Maybe<UserResponse>;
  payment: PaymentResponse;
  availability?: Maybe<Array<Availability>>;
};


export type QuerySpotsArgs = {
  query?: Maybe<SpotsQuery>;
  limit?: Maybe<Scalars['Int']>;
};


export type QuerySpotArgs = {
  _id?: Maybe<Scalars['String']>;
  slug?: Maybe<Scalars['String']>;
};


export type QueryPaymentArgs = {
  id?: Maybe<Scalars['String']>;
};


export type QueryAvailabilityArgs = {
  selectedMonth?: Maybe<Scalars['String']>;
};

export type Reservation = {
  __typename?: 'Reservation';
  _id: Scalars['String'];
  timestamp: Scalars['String'];
  userId: Scalars['String'];
  spotName: Scalars['String'];
  spotImageUrl: Scalars['String'];
  spotId: Scalars['String'];
  spotSlug: Scalars['String'];
  kayakReservations?: Maybe<Array<KayakReservation>>;
  priceEur: Scalars['Float'];
};

export type Spot = {
  __typename?: 'Spot';
  _id: Scalars['ID'];
  title: Scalars['String'];
  description: Scalars['String'];
  locationName: Scalars['String'];
  location: Location;
  imageUrls?: Maybe<Array<Maybe<ImageUrls>>>;
  mainImageUrl: Scalars['String'];
  kayakTypes?: Maybe<Array<SpotKayakType>>;
  isHighlighted: Scalars['Boolean'];
  slug?: Maybe<Scalars['String']>;
};

export type SpotKayakType = {
  __typename?: 'SpotKayakType';
  name: Scalars['String'];
  description: Scalars['String'];
  pax: Scalars['String'];
  pricing?: Maybe<Array<KayakPricing>>;
};

export type SpotsQuery = {
  isHighlighted?: Maybe<Scalars['Boolean']>;
};


export type UserResponse = {
  __typename?: 'UserResponse';
  email?: Maybe<Scalars['String']>;
  isCompany?: Maybe<Scalars['Boolean']>;
};
