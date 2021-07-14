import moment from 'moment';
import { DbService } from '../services/DbService';

export const getAvailabilities = (spotId: string, selectedMonth: string) => {
  const startOfMonth = parseInt(
    moment(selectedMonth).utc().startOf('day').format('X')
  );
  const endOfMonth = parseInt(
    moment(selectedMonth).utc().endOf('month').format('X')
  );

  return DbService.getAvailabilities(spotId, startOfMonth, endOfMonth);
};
