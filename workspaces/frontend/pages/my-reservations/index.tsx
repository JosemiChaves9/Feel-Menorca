import { useQuery } from '@apollo/client';
import { BaseHeader } from 'components/BaseHeader/BaseHeader';
import { useAuth } from 'components/UserProvider/UserProvider';
import { Reservation } from 'gql';
import { GET_RESERVATIONS } from 'gql/ReservationQueries';
import moment from 'moment';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from './index.module.scss';

export default function myReservations() {
  const { user } = useAuth();
  const router = useRouter();
  const { loading, error, data } = useQuery(GET_RESERVATIONS);
  if (loading) return 'Loading...';
  if (error) {
    if (error.message === 'ERR_NO_USER_LOGGED') {
      setTimeout(() => {
        router.push('/login');
      }, 1500);
      return 'Debes iniciar sesion para ver tus reservas, redirigiendo...';
    } else {
      return error.message;
    }
  }

  const isDateInPast = (date: string) => moment(date, 'X').isBefore(moment());

  return (
    <>
      <BaseHeader />
      <section className='py-5'>
        <div className='container'>
          <h2 className='mb-5'>Tus reservas futuras</h2>
          <div className='row'>
            {data.reservations
              .filter(
                (reservation: Reservation) =>
                  !isDateInPast(reservation.timestamp)
              )
              .map((reservation: Reservation) =>
                renderReservationCard(reservation)
              )}
          </div>

          <h2 className='mb-5'>Tus reservas pasadas</h2>
          <div className='row'>
            {data.reservations
              .filter((reservation: Reservation) =>
                isDateInPast(reservation.timestamp)
              )
              .map((reservation: Reservation) =>
                renderReservationCard(reservation)
              )}
          </div>
        </div>
      </section>
    </>
  );
}

const renderReservationCard = (reservation: Reservation): JSX.Element => {
  return (
    <div className={`${styles.cardFix} col-xl-3 col-md-4 col-sm-6 col-10 mb-5`}>
      <div className='card h-100 border-0 shadow'>
        <div className='card-img-top overflow-hidden'>
          <Link href={`spot/${reservation.spotSlug}`}>
            <a>
              <img
                className='img-fluid'
                src={reservation.spotImageUrl}
                alt='Modern, Well-Appointed Room'
              />
            </a>
          </Link>
        </div>
        <div className='card-body d-flex align-items-center'>
          <div className='w-100'>
            <p className='subtitle font-weight-normal text-sm mb-2'>
              {moment(reservation.timestamp, 'X').format('YYYY-MM-DD')}
            </p>
            <h5 className='card-title'>
              <p className='text-decoration-none text-dark'>
                {reservation.spotName}
              </p>
            </h5>

            <div className='d-flex card-subtitle mb-3'>
              <p className='flex-grow-1 mb-0 text-muted text-sm'>
                {reservation.kayakReservations.map((reservedKayaks) => {
                  return `Reserve duration: ${reservedKayaks.duration}`;
                })}
              </p>
            </div>
            <div className='d-flex card-subtitle mb-3'>
              <p className='flex-grow-1 mb-0 text-muted text-sm'>
                {reservation.kayakReservations.map((reservedKayaks) => {
                  return `Kayak Type: ${reservedKayaks.kayakType}`;
                })}
              </p>
            </div>
            <div className='d-flex card-subtitle mb-3'>
              <p className='flex-grow-1 mb-0 text-muted text-sm'>
                Price: {reservation.priceEur} €
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
