import {
  faCalendarAlt,
  faCalendarCheck,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useAuth } from 'components/UserProvider/UserProvider';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { BasePageLayout } from '../../components/BasePageLayout/BasePageLayout';

const Admin = () => {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user || !user.isCompany) {
      router.push('/login');
    }
  }, []);

  return (
    <>
      <BasePageLayout>
        <div className='container'>
          <section className='pt-5'>
            <h1 className='hero-heading mb-0'>Panel de control</h1>
            <p className='text-muted mb-5'>Gestiona tu alquiler</p>
          </section>
          <div className='row'>
            <div className='col-6 col-md-4 mb-30px'>
              <div className='card h-100 border-0 shadow hover-animate'>
                <div className='card-body'>
                  <div className='icon-rounded bg-secondary-light mb-3'>
                    <FontAwesomeIcon
                      size={'2x'}
                      color='#58e2c2'
                      icon={faCalendarAlt}
                    />
                  </div>
                  <h5 className='card-title mb-3'>
                    <Link href='/admin/reservations'>
                      <a className='text-decoration-none text-dark stretched-link'>
                        Reservas
                      </a>
                    </Link>
                  </h5>
                  <p className='text-muted card-text text-sm'>
                    Consulta tus reservas
                  </p>
                </div>
              </div>
            </div>
            <div className='col-6 col-md-4 mb-30px'>
              <div className='card h-100 border-0 shadow hover-animate'>
                <div className='card-body'>
                  <div className='icon-rounded bg-secondary-light mb-3'>
                    <FontAwesomeIcon
                      size={'2x'}
                      color='#58e2c2'
                      icon={faCalendarCheck}
                    />
                  </div>
                  <h5 className='card-title mb-3'>
                    <Link href='/admin/availability'>
                      <a className='text-decoration-none text-dark stretched-link'>
                        Disponibilidad
                      </a>
                    </Link>
                  </h5>
                  <p className='text-muted card-text text-sm'>
                    Actualiza tu disponibilidad
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </BasePageLayout>
    </>
  );
};

export default Admin;
