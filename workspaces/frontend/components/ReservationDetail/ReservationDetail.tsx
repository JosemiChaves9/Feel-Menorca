import { KayakType, Spot } from 'gql';
import { TempReservation } from 'services/TempReservationService';
import {
  getKayakPriceInDate,
  getKayaksTotalPrice,
} from '@mallorcabootcamp/bsr-utils';
import moment from 'moment';

interface Props {
  spot: Spot;
  tempReservation: TempReservation;
}

export const ReservationDetail = ({ spot, tempReservation }: Props) => {
  const getKayakTypeDescription = (kayakType: string) => {
    return spot.kayakTypes.find((type) => kayakType).description;
  };
  const getKayakTimeDescription = (kayakType: string, kayakTime: string) => {
    return spot.kayakTypes
      .find((type) => kayakType)
      .pricing.find((pricingItem) => pricingItem.durationName === kayakTime)
      .durationDescription;
  };
  return (
    <div className='col-lg-5 pl-xl-5'>
      <div className='card border-0 shadow mb-3'>
        <div className='card-body p-4'>
          <div className='text-block pb-3'>
            <div className='media align-items-center'>
              <div className='media-body'>
                <h6>
                  <a className='text-reset' href='detail-rooms.html'>
                    {spot && spot.title}
                  </a>
                </h6>
                <p className='text-muted text-sm mb-0'>
                  {moment(tempReservation.date, `YYYY-MM-DD`).format(
                    'DD-MM-YYYY'
                  )}
                </p>
              </div>
              <a href='detail-rooms.html'>
                <img className='ml-3 rounded' src='' alt='' width='100' />
              </a>
            </div>
          </div>
          <div className='text-block py-3'>
            <table className='w-100'>
              <thead>
                <tr>
                  <th>Tipo de kayak</th>
                  <th>Duración</th>
                  <th className='text-right'>Precio</th>
                </tr>
              </thead>
              <tbody>
                {tempReservation.kayaks.map((kayak, idx) => (
                  <tr key={idx}>
                    <th className='font-weight-normal py-2'>
                      {getKayakTypeDescription(kayak.kayakType)}
                    </th>
                    <th className='font-weight-normal py-2'>
                      {getKayakTimeDescription(kayak.kayakType, kayak.duration)}
                    </th>
                    <td className='text-right py-2'>
                      {getKayakPriceInDate(
                        kayak.kayakType,
                        kayak.duration,
                        tempReservation.date,
                        spot.kayakTypes
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className='border-top '>
                  <th className='pt-3'>Total</th>
                  <th className='pt-3'>&nbsp;</th>
                  <td className='font-weight-bold text-right pt-3'>
                    {getKayaksTotalPrice(
                      tempReservation.kayaks,
                      tempReservation.date,
                      spot.kayakTypes
                    )}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
        <div className='card-footer bg-primary-light py-4 border-0'>
          <div className='media align-items-center'>
            <div className='media-body'>
              <h6 className='text-primary'>Cancelación flexible</h6>
              <p className='text-sm text-primary opacity-8 mb-0'>
                Cancelación gratuita hasta 48h antes. Te recordaremos tu reserva
                vía email.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
