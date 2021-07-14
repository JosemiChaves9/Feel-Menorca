import { useEffect, useState } from 'react';
import { BasePageLayout } from '../../components/BasePageLayout/BasePageLayout';
import { Field, Form, Formik, FormikProps } from 'formik';
import * as Yup from 'yup';
import classnames from 'classnames';
import styles from './Index.module.scss';
import {
  TempReservation,
  TempReservationService,
} from '../../services/TempReservationService';
import { client } from '../../services/ApolloConnection';
import { SPOT } from '../../gql/OneSpotQueries';
import { useAuth } from '../../components/UserProvider/UserProvider';
import { PaymentForm } from '../../components/PaymentForm/PaymentForm';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { useRouter } from 'next/router';
import { ReservationDetail } from 'components/ReservationDetail/ReservationDetail';

const pKeyEnv = process.env.NEXT_PUBLIC_STRIPE_PKEY;

const stripePromise = loadStripe(pKeyEnv);

const formikInitialValues = {
  providedEmail: '',
  providedPhoneNumber: '',
  providedPassword: '',
  passwordConfirm: '',
};

const formikLoginValidationSchema = Yup.object({
  providedEmail: Yup.string()
    .required('Es necesario un email')
    .email('Introduce un email valido'),
  providedPassword: Yup.string()
    .required('Introduce una contraseña')
    .min(6, 'La contraseña debe tener al menos 6 caracteres'),
});

const formikSignupValidationSchema = Yup.object({
  providedEmail: Yup.string()
    .required('Es necesario un email')
    .email('Introduce un email valido'),
  providedPhoneNumber: Yup.string().required(
    'Es necesario un numero de telefono'
  ),
  providedPassword: Yup.string()
    .required('Introduce una contraseña')
    .min(6, 'La contraseña debe tener al menos 6 caracteres'),
  passwordConfirm: Yup.string()
    .required('Debes confirmar tu contraseña')
    .min(6, 'La contraseña debe tener al menos 6 caracteres')
    .oneOf([Yup.ref('providedPassword'), null], 'Las contraseñas no coinciden'),
});

export default function Reserve() {
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoginMode, setIsLoginMode] = useState(false);
  const [isSuccessfullLoggedIn, setIsSuccessfullLoggedIn] = useState(false);
  const [tempReservation, setTempReservation] = useState<TempReservation>();
  const [spot, setSpot] = useState<any>();
  const { login, signup, user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const reservation = TempReservationService.getTempReservation();
    if (!reservation) {
      router.push(`/`);
    }
    setTempReservation(reservation);
  }, []);

  useEffect(() => {
    tempReservation &&
      client
        .query({ query: SPOT, variables: { _id: tempReservation.spotId } })
        .then(({ data }) => {
          setSpot(data.spot);
        });
  }, [tempReservation]);

  const onClickOnSignup = (
    providedEmail: string,
    providedPhoneNumber: string,
    providedPassword: string
  ) => {
    setErrorMessage(null);
    signup(providedEmail, providedPhoneNumber, providedPassword).then(
      (res) => {
        setIsSuccessfullLoggedIn(true);
      },
      (err) => {
        setErrorMessage(err);
      }
    );
  };

  const onClickOnLogin = (providedEmail: string, providedPassword: string) => {
    setErrorMessage(null);
    login(providedEmail, providedPassword).then(
      () => {
        setIsSuccessfullLoggedIn(true);
      },
      (err) => {
        setErrorMessage(err);
      }
    );
  };

  if (!tempReservation || !spot) {
    return 'No tiene ninguna reserva en proceso. Redirigiendo...';
  }

  return (
    <BasePageLayout>
      <section>
        <div className='container mt-5'>
          <div className='row'>
            <div className='col-lg-7'>
              <h1 className='h2 mb-3'> Confirmación y pago</h1>
              {!user && (
                <div>
                  <h5 className='mb-3'>Tus datos personales</h5>
                  <div>
                    {errorMessage && (
                      <div className='alert alert-danger' role='alert'>
                        {errorMessage}
                      </div>
                    )}
                    {isSuccessfullLoggedIn && (
                      <div className='alert alert-success' role='alert'>
                        ¡Operación realizada con éxito!
                      </div>
                    )}
                  </div>

                  <div>
                    {isLoginMode && (
                      <Formik
                        initialValues={formikInitialValues}
                        validationSchema={formikLoginValidationSchema}
                        onSubmit={(values, { setSubmitting, resetForm }) => {
                          onClickOnLogin(
                            values.providedEmail,
                            values.providedPassword
                          );
                          resetForm();
                          setSubmitting(false);
                        }}>
                        {({ touched, errors }: FormikProps<any>) => (
                          <Form className='form-validate'>
                            <div className='row'>
                              <div className='form-group col-md-12'>
                                <label
                                  className='form-label'
                                  htmlFor='providedEmail'>
                                  Email
                                </label>
                                <Field
                                  className={classnames('form-control', {
                                    'is-invalid':
                                      touched.providedEmail &&
                                      errors.providedEmail,
                                  })}
                                  name='providedEmail'
                                  placeholder='Tu email'
                                  id='providedEmail'
                                />
                                {touched.providedEmail &&
                                  errors.providedEmail && (
                                    <div className='invalid-feedback'>
                                      {errors.providedEmail}
                                    </div>
                                  )}
                              </div>
                            </div>
                            <div className='row'>
                              <div className='form-group col-md-12'>
                                <label
                                  className='form-label'
                                  htmlFor='providedPassword'>
                                  Contraseña
                                </label>
                                <Field
                                  className={classnames('form-control', {
                                    'is-invalid':
                                      touched.providedPassword &&
                                      errors.providedPassword,
                                  })}
                                  type='password'
                                  name='providedPassword'
                                  placeholder='••••••••'
                                  id='providedPassword'
                                />
                                {touched.providedPassword &&
                                  errors.providedPassword && (
                                    <div className='invalid-feedback'>
                                      {errors.providedPassword}
                                    </div>
                                  )}
                              </div>
                            </div>
                            <div>
                              <button className='btn btn-primary' type='submit'>
                                Iniciar sesión{' '}
                              </button>
                              <p
                                className={`${styles.loginMode} pt-4 pl-1 text-primary`}
                                onClick={() => setIsLoginMode(false)}>
                                Crea tu cuenta ahora
                              </p>
                            </div>
                          </Form>
                        )}
                      </Formik>
                    )}

                    {!isLoginMode && (
                      <Formik
                        initialValues={formikInitialValues}
                        validationSchema={formikSignupValidationSchema}
                        onSubmit={(values, { setSubmitting, resetForm }) => {
                          onClickOnSignup(
                            values.providedEmail,
                            values.providedPhoneNumber,
                            values.providedPassword
                          );
                          resetForm();
                          setSubmitting(true);
                        }}>
                        {({ touched, errors }: FormikProps<any>) => (
                          <div>
                            <Form className='form-validate'>
                              <div className='row'>
                                <div className='form-group col-md-6'>
                                  <label
                                    className='form-label'
                                    htmlFor='providedEmail'>
                                    Email
                                  </label>
                                  <Field
                                    className={classnames('form-control', {
                                      'is-invalid':
                                        touched.providedEmail &&
                                        errors.providedEmail,
                                    })}
                                    type='email'
                                    name='providedEmail'
                                    placeholder='Tu email'
                                    id='providedEmail'
                                  />
                                  {touched.providedEmail &&
                                    errors.providedEmail && (
                                      <div className='invalid-feedback'>
                                        {errors.providedEmail}
                                      </div>
                                    )}
                                </div>
                                <div className='form-group col-md-6'>
                                  <label
                                    className='form-label'
                                    htmlFor='providedPhoneNumber'>
                                    Numero de telefono
                                  </label>
                                  <Field
                                    className={classnames('form-control', {
                                      'is-invalid':
                                        touched.providedPhoneNumber &&
                                        errors.providedPhoneNumber,
                                    })}
                                    type='tel'
                                    name='providedPhoneNumber'
                                    placeholder='Tu numero de telefono'
                                    id='providedPhoneNumber'
                                  />
                                  {touched.providedPhoneNumber &&
                                    errors.providedPhoneNumber && (
                                      <div className='invalid-feedback'>
                                        {errors.providedPhoneNumber}
                                      </div>
                                    )}
                                </div>
                              </div>
                              <div className='row'>
                                <div className='form-group col-md-6'>
                                  <label
                                    className='form-label'
                                    htmlFor='providedPassword'>
                                    Contraseña
                                  </label>
                                  <Field
                                    className={classnames('form-control', {
                                      'is-invalid':
                                        touched.providedPassword &&
                                        errors.providedPassword,
                                    })}
                                    type='password'
                                    name='providedPassword'
                                    placeholder='••••••••'
                                    id='providedPassword'
                                  />
                                  {touched.providedPassword &&
                                    errors.providedPassword && (
                                      <div className='invalid-feedback'>
                                        {errors.providedPassword}
                                      </div>
                                    )}
                                </div>
                                <div className='form-group col-md-6'>
                                  <label
                                    className='form-label'
                                    htmlFor='passwordConfirm'>
                                    Confirmar contraseña
                                  </label>
                                  <Field
                                    className={classnames('form-control', {
                                      'is-invalid':
                                        touched.passwordConfirm &&
                                        errors.passwordConfirm,
                                    })}
                                    type='password'
                                    name='passwordConfirm'
                                    placeholder='••••••••'
                                    id='passwordConfirm'
                                  />
                                  {touched.passwordConfirm &&
                                    errors.passwordConfirm && (
                                      <div className='invalid-feedback'>
                                        {errors.passwordConfirm}
                                      </div>
                                    )}
                                </div>
                              </div>
                              <div className='row'>
                                <div className='col-md-12'>
                                  <button
                                    className='btn btn-primary'
                                    type='submit'>
                                    Registrar{' '}
                                  </button>
                                </div>
                                <p className='pl-3 pt-4'>
                                  ¿Ya estas registrado? También puedes{' '}
                                  <span
                                    className={`${styles.loginMode} text-primary`}
                                    onClick={() => setIsLoginMode(true)}>
                                    iniciar sesión
                                  </span>
                                </p>
                              </div>
                            </Form>
                          </div>
                        )}
                      </Formik>
                    )}
                  </div>
                </div>
              )}
              <Elements stripe={stripePromise}>
                <PaymentForm
                  hasUser={!!user}
                  errorMessage={setErrorMessage}
                  tempReservation={tempReservation}
                />
              </Elements>
            </div>
            <ReservationDetail
              spot={spot}
              tempReservation={tempReservation}></ReservationDetail>
          </div>
        </div>
      </section>
    </BasePageLayout>
  );
}
