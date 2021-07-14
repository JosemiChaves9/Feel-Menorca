import { getKayaksTotalPrice } from '@mallorcabootcamp/bsr-utils';
import { SpotKayakType } from '@mallorcabootcamp/bsr-types';
import { KayakReservations } from '../types/types';
import moment from 'moment';

export const paymentCalculation = (
  kayakReservations: KayakReservations[],
  timestamp: string,
  kayakTypes: SpotKayakType[]
) => {
  const dataFormated = moment(timestamp, 'X').format('YYYY-MM-DD');
  const priceCalculatedString = getKayaksTotalPrice(
    kayakReservations,
    dataFormated,
    kayakTypes
  )
    .replace('€', '')
    .replace('.', '');

  const priceCalculatedNumber = parseInt(priceCalculatedString);

  return priceCalculatedNumber;
};
