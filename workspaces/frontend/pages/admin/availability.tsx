import { useMutation, useQuery } from '@apollo/client';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Badge, Calendar } from 'antd';
import { BasePageLayout } from 'components/BasePageLayout/BasePageLayout';
import { ADD_AVAILABILITY } from '../../gql/AvailabilityMutations';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { GET_AVAILABILITY } from 'gql/AvailabilityQueries';
import styles from './index.module.scss';
import { useAuth } from 'components/UserProvider/UserProvider';
import { useRouter } from 'next/router';
import moment, { Moment } from 'moment';
import { QueryAvailabilityArgs, Availability } from '../../gql';

interface NewAvailability {
  startOfDateRangeProvided: string;
  endOfDateRangeProvided: string;
  kayakType: string;
  numKayakAvailability: string;
}

const AvailabilityView = () => {
  const { register, handleSubmit } = useForm();
  const [selectedMonth, setSelectedMonth] = useState<string>(
    moment().utc().toISOString()
  );
  const [addAvailabilityMutation] = useMutation(ADD_AVAILABILITY);
  const [errorMessage, setErrorMessage] = useState<string>(null);
  const [successMessage, setSuccessMessage] = useState<string>(null);
  const { loading, data, refetch } = useQuery<
    { availability: Availability[] },
    QueryAvailabilityArgs
  >(GET_AVAILABILITY, {
    variables: {
      selectedMonth: selectedMonth,
    },
  });
  const { user, userIsLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user && !userIsLoading) {
      router.push('/login');
      return;
    }
  }, [user, userIsLoading]);

  if (!user) {
    return <div></div>;
  }

  const onSubmit = async (data: NewAvailability) => {
    setErrorMessage(null);
    setSuccessMessage(null);
    const {
      startOfDateRangeProvided,
      endOfDateRangeProvided,
      kayakType,
      numKayakAvailability,
    } = data;
    const res = await addAvailabilityMutation({
      variables: {
        startOfDateRangeProvided,
        endOfDateRangeProvided,
        kayakType,
        numKayakAvailability,
      },
    });
    if (res.data.addAvailability.error === 'ERR_DATE_RANGE_NOT_VALID') {
      setErrorMessage('El rango de fechas especificado no es válido');
    }
    if (res.data.addAvailability.ok) {
      setSuccessMessage('¡Disponibilidad añadida!');
      refetch();
    }
  };

  const dateCellRender = (value: Moment) => {
    const currentDayTimestamp = value.utc().startOf('day').format('X');

    const availabilitiesForCurrentDate: Availability[] =
      data.availability.filter((item: Availability) => {
        return item.date === currentDayTimestamp;
      });

    return (
      <ul className='events'>
        {availabilitiesForCurrentDate.map((availability: Availability) => {
          return (
            <li key={availability.numKayakAvailability}>
              <Badge
                status={'success'}
                text={
                  availability.numKayakAvailability +
                  'x ' +
                  availability.kayakType
                }
              />
            </li>
          );
        })}
      </ul>
    );
  };

  if (loading) {
    return <p>loading...</p>;
  }

  return (
    <BasePageLayout>
      <div className='container'>
        <section>
          <Link href='/admin'>
            <button className='btn btn-link'>
              <FontAwesomeIcon icon={faAngleLeft}></FontAwesomeIcon> Volver
            </button>
          </Link>
          <h1 className='hero-heading mb-0'>Disponibilidad</h1>
          <p className='text-muted mb-5'>Actualiza tu disponibilidad</p>
        </section>
        {successMessage && (
          <div className='alert alert-success' role='alert'>
            {successMessage}
          </div>
        )}
        {errorMessage && (
          <div className='alert alert-danger' role='alert'>
            {errorMessage}
          </div>
        )}
        <section>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className='row pt-4'>
              <div className='form-group col-md-6'>
                <label className='form-label' htmlFor='providedDateForm'>
                  Desde
                </label>
                <input
                  className='form-control'
                  type='date'
                  id='startOfDateRangeProvided'
                  {...register('startOfDateRangeProvided', { required: true })}
                />
              </div>
              <div className='form-group col-md-6'>
                <label className='form-label' htmlFor='endOfDateRangeProvided'>
                  Hasta
                </label>
                <input
                  className='form-control'
                  type='date'
                  id='endOfDateRangeProvided'
                  {...register('endOfDateRangeProvided', { required: true })}
                />
              </div>
              <div className='form-group col-md-6'>
                <label className='form-label' htmlFor='kayakType'>
                  Tipo de Kayak
                </label>
                <select
                  className='form-control'
                  id='kayakType'
                  defaultValue='defaultValue'
                  {...register('kayakType', { required: true })}>
                  <option value='defaultValue' disabled>
                    Selecciona un tipo
                  </option>
                  <option value='single'>Individual</option>
                  <option value='double'>Doble</option>
                  <option value='professional'>Travesía</option>
                </select>
              </div>

              <div className='form-group col-md-6'>
                <label className='form-label' htmlFor='numKayakAvailability'>
                  Cantidad de kayaks
                </label>
                <input
                  className='form-control'
                  type='number'
                  id='numKayakAvailability'
                  {...register('numKayakAvailability', { required: true })}
                  placeholder='¿Cuantos kayaks?'
                />
              </div>
            </div>
            <button className='btn btn-outline-primary mt-2 mb-3' type='submit'>
              Actualizar Disponibilidad
            </button>
          </form>
        </section>

        <Calendar
          dateCellRender={dateCellRender}
          className={`${styles.calendarFix}`}
          onPanelChange={(value) => setSelectedMonth(value.utc().toISOString())}
          defaultValue={moment(selectedMonth).utc().startOf('month')}
        />
      </div>
    </BasePageLayout>
  );
};

export default AvailabilityView;
