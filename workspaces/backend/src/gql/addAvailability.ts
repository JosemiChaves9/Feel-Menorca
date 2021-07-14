import { DbService } from '../services/DbService';
import { MutationAddAvailabilityArgs } from '../gql';
import Moment from 'moment';
import { extendMoment } from 'moment-range';
import { UserContext } from '../types/types';

const moment = extendMoment(Moment as any);

export const addAvailability = async (
  parent: null | undefined,
  {
    startOfDateRangeProvided,
    endOfDateRangeProvided,
    kayakType,
    numKayakAvailability,
  }: MutationAddAvailabilityArgs,
  context: UserContext
) => {
  const startOfDataRange = moment(startOfDateRangeProvided);
  const endOfDataRange = moment(endOfDateRangeProvided);

  if (!context.user) {
    return {
      error: 'ERR_NO_USER_LOGGED',
      ok: false,
    };
  }

  if (!context.user.companySpotId) {
    return {
      error: 'ERR_USER_NOT_COMPANY',
      ok: false,
    };
  }

  if (
    startOfDataRange.startOf('day').isAfter(endOfDataRange) ||
    endOfDataRange.startOf('day').isBefore(startOfDataRange) ||
    startOfDataRange.isBefore(moment().startOf('day'))
  ) {
    return {
      error: 'ERR_DATE_RANGE_NOT_VALID',
      ok: false,
    };
  }

  const rangeOfDates = moment.range(startOfDataRange, endOfDataRange);
  const daysOfAvailability = Array.from(rangeOfDates.by('days'));

  const availabilities = daysOfAvailability.map((day) => ({
    spotId: context.user.companySpotId,
    date: parseInt(day.format('X')),
    kayakType,
    numKayakAvailability: parseInt(numKayakAvailability),
  }));

  try {
    return DbService.createOrUpdateMultipleAvailability(availabilities).then(
      () => {
        return {
          ok: true,
          error: '',
        };
      }
    );
  } catch (error) {
    return {
      ok: false,
      error: 'No hemos podido actualizar tu disponibilidad',
    };
  }
};
