import { useQuery } from '@apollo/client';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Badge, Calendar } from 'antd';
import Link from 'next/link';
import { useCallback } from 'react';
import { BasePageLayout } from '../../components/BasePageLayout/BasePageLayout';
import { GET_RESERVATIONS } from '../../gql/ReservationQueries';

const Reservations = () => {
  const { loading, error, data } = useQuery(GET_RESERVATIONS);
  const dateCellRender = useCallback(
    (value: moment.Moment) => {
      const startOfDay = value.startOf('day').format('X');
      const endOfDay = value.endOf('day').format('X');
      const listData = data.reservations.filter(
        ({ timestamp }) => timestamp >= startOfDay && timestamp <= endOfDay
      );
      return (
        <ul className='events'>
          {listData.map((item) => (
            <li key={item.timestamp}>
              <Badge status={'warning'} text={item.kayakType} />
            </li>
          ))}
        </ul>
      );
    },
    [data]
  );

  if (loading) {
    return <p>loading...</p>;
  }
  if (error) {
    return <p>error</p>;
  }

  return (
    <BasePageLayout>
      <div className='container'>
        <section className='pb-5'>
          <Link href='/admin'>
            <button className='btn btn-link'>
              <FontAwesomeIcon icon={faAngleLeft}></FontAwesomeIcon> Volver
            </button>
          </Link>
          <h1 className='hero-heading mb-0'>Reservas</h1>
          <p className='text-muted mb-5'>Consulta tus reservas</p>
        </section>
        <section>
          <Calendar dateCellRender={dateCellRender} fullscreen={true} />
        </section>
      </div>
    </BasePageLayout>
  );
};

export default Reservations;
