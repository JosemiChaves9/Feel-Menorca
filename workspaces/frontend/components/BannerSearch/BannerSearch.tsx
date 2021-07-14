import { useRouter } from 'next/router';
import { useState } from 'react';
import styles from './BannerSearch.module.scss';
import classnames from 'classnames';

interface Spot {
  slug: string;
  title: string;
}

interface Props {
  spots: Spot[];
}

export const BannerSearch = ({ spots }: Props) => {
  const router = useRouter();
  const [date, setDate] = useState('');
  const [place, setPlace] = useState('');
  const [hasErrors, setHasErrors] = useState(false);

  const handleOnClickOnButton = () => {
    date && place
      ? router.push(`/spot/${place}?date=${date}`)
      : setHasErrors(true);
  };

  return (
    <div className={`${styles.containerFix}`}>
      <div className='container py-6 py-7 text-white z-index-20'>
        <div className='text-center text-lg-center mt-3'>
          <h1 className=' display-3 font-weight-bold'>
            Alquila tu kayak en Menorca
          </h1>
          <div className='search-bar mt-5 p-3 p-lg-1 pl-lg-4 m-3'>
            <form>
              <div className='row'>
                <div
                  className={classnames('col-lg-4 form-group pb-lg-0', {
                    'pb-5': !place && hasErrors,
                  })}>
                  <select
                    id='spots'
                    className={classnames(
                      `${styles.dataListFix} form-control custom-select pb-1`,
                      `${
                        !place && hasErrors
                          ? 'is-invalid border-danger'
                          : 'border-0'
                      }`
                    )}
                    onChange={({
                      target,
                    }: React.ChangeEvent<HTMLSelectElement>) =>
                      setPlace(target.value)
                    }>
                    <option style={{ display: 'none' }} value={''}>
                      Selecciona un lugar
                    </option>
                    {spots.map(({ title, slug }) => (
                      <option key={title} value={slug}>
                        {title}
                      </option>
                    ))}
                  </select>
                  <div className='invalid-feedback alert alert-danger position-absolute border-danger w-auto p-2 px-3 rounded mt-2 '>
                    Por favor, selecciona un lugar.
                  </div>
                </div>
                <div className='col-lg-4 form-group'>
                  <div
                    className={classnames(
                      'input-label-absolute input-label-absolute-right pb-lg-0',
                      { 'pb-5': !date && hasErrors }
                    )}>
                    <label className='label-absolute ' htmlFor='date'></label>
                    <input
                      className={classnames(
                        `${styles.pointerCursor} form-control`,
                        `${
                          !date && hasErrors
                            ? 'is-invalid border-danger'
                            : 'border-0'
                        }`
                      )}
                      type='date'
                      name='date'
                      defaultValue='Selecciona una fecha'
                      id='date'
                      onChange={({
                        target,
                      }: React.ChangeEvent<HTMLInputElement>) =>
                        setDate(target.value)
                      }
                    />
                    <div className='invalid-feedback alert alert-danger position-absolute border-danger w-auto p-2 px-3 rounded mt-2 '>
                      Por favor, selecciona una fecha.
                    </div>
                  </div>
                </div>
                <div className='col-lg-4 form-group'>
                  <button
                    className={classnames(
                      `btn btn-primary btn-block rounded-xl h-100`,
                      { [styles.searchButton]: !date || !place }
                    )}
                    type='button'
                    onClick={handleOnClickOnButton}>
                    Buscar{' '}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
