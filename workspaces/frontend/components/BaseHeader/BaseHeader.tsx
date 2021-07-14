import Link from 'next/link';
import styles from './BaseHeader.module.scss';
import { useAuth } from '../UserProvider/UserProvider';

export const BaseHeader = () => {
  const { logout, user } = useAuth();

  return (
    <>
      <nav className={`${styles.navbarFix} navbar navbar-expand-lg bg-white`}>
        <div>
          <a className='navbar-brand py-1' href='/'>
            <img
              src='/feelmenorca-logo-cropped-header.png'
              alt='FeelMenorca Logo'
              className='img-fluid'
            />
          </a>
        </div>
        {!user ? (
          <div>
            <ul className='nav-item navbar-nav'>
              <li>
                <Link href='/login'>
                  <a className='nav-link'>Entrar</a>
                </Link>
              </li>
              <li className='nav-item'>
                <Link href='/signup'>
                  <a className='nav-link'>Registrarme</a>
                </Link>
              </li>
            </ul>
          </div>
        ) : (
          <div>
            <ul className='nav-item navbar-nav'>
              <li className={`${styles.email} nav-link px-4 my-3`}>
                {user.email}
              </li>
              {!user.isCompany ? (
                <Link href='/my-reservations'>
                  <a className='btn btn-primary btn mr-lg-3 my-3'>
                    Mis Reservas
                  </a>
                </Link>
              ) : (
                <Link href='/admin'>
                  <a className='btn btn-primary btn mr-lg-3 my-3'>
                    Administracion
                  </a>
                </Link>
              )}

              <button
                className='btn btn-primary btn mr-lg-3 my-3'
                onClick={() => {
                  logout();
                }}>
                Salir
              </button>
            </ul>
          </div>
        )}
      </nav>
    </>
  );
};
