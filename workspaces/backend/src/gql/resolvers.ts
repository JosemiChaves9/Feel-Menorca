import { DbService } from '../services/DbService';
import { loginMutation } from './loginMutation';
import { signupMutation } from './signupMutation';
import { UserContext } from '../types/types';
import { createReservationMutation } from './createReservationMutation';
import { Availability, SpotsQuery } from '../gql';
import { changePasswordRequest } from './changePasswordRequest';
import { changePassword } from './changePassword';
import { addAvailability } from './addAvailability';
import { getAvailabilities } from './getAvailabilities';

export const resolvers = {
  Query: {
    spots: async (
      parent: null | undefined,
      { query, limit }: { query: SpotsQuery; limit: number }
    ) => {
      return DbService.getSpots(query, limit);
    },
    reservations: (
      parent: null | undefined,
      args: null | undefined,
      context: UserContext
    ) => {
      return DbService.getReservations(
        context.user ? { userId: context.user._id } : null
      );
    },
    spot: async (
      parent: null | undefined,
      { _id, slug }: { _id: string; slug: string }
    ) => {
      return DbService.getSpot(_id, slug);
    },
    user: async (
      parent: null | undefined,
      args: null | undefined,
      context: UserContext
    ) => {
      return context.user
        ? {
            email: context.user.email,
            isCompany: !!context.user.companySpotId,
          }
        : null;
    },
    availability: async (
      parent: null | undefined,
      { selectedMonth }: { selectedMonth: string },
      context: UserContext
    ) => {
      return getAvailabilities(context.user.companySpotId, selectedMonth);
    },
  },

  Mutation: {
    login: loginMutation,
    signup: signupMutation,
    createReservation: createReservationMutation,
    changePasswordRequest: changePasswordRequest,
    changePassword: changePassword,
    addAvailability: addAvailability,
  },
};
