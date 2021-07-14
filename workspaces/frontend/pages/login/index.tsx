import { useRouter } from 'next/router';
import { useState } from 'react';
import * as Yup from 'yup';
import Link from 'next/link';
import { Formik, Form, FormikProps, Field } from 'formik';
import classnames from 'classnames';
import { useAuth } from '../../components/UserProvider/UserProvider';
import { AuthLayout } from 'components/AuthLayout/AuthLayout';

interface FormValues {
  email: string;
  password: string;
}

const formikInitialValues = {
  email: '',
  password: '',
};

const formikValidationSchema = Yup.object({
  email: Yup.string()
    .email('Se requiere un email valido')
    .required('Se requiere un email'),
  password: Yup.string().required('Se requiere una contraseña'),
});

export default function LoginScreen() {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState(null);
  const { login } = useAuth();

  const onClickOnLogIn = (emailProvided: string, passwordProvided: string) => {
    setErrorMessage(false);
    login(emailProvided, passwordProvided).then(
      (res) => {
        router.push('/');
      },
      (err) => {
        setErrorMessage(err);
      }
    );
  };

  return (
    <AuthLayout title="¡Bienvenido!">
      <div>
        {errorMessage && (
          <div className='alert alert-danger' role='alert'>
            {errorMessage}
          </div>
        )}
      </div>

      <Formik
        initialValues={formikInitialValues}
        validationSchema={formikValidationSchema}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          onClickOnLogIn(values.email, values.password);
          resetForm();
          setSubmitting(false);
        }}>
        {({ touched, errors }: FormikProps<FormValues>) => (
          <Form className='form-validate'>
            <div className='form-group'>
              <label className='form-label' htmlFor='loginUsername'>
                Dirección email
                    </label>
              <Field
                className={classnames(`form-control`, {
                  'is-invalid': touched.email && errors.email,
                })}
                name='email'
                id='loginUsername'
                type='text'
                placeholder='nombre@direccion.com'
              />
              {touched.email && errors.email && (
                <div className='invalid-feedback'>{errors.email}</div>
              )}
            </div>
            <div className='form-group mb-4'>
              <div className='row'>
                <div className='col'>
                  <label className='form-label' htmlFor='loginPassword'>
                    Conraseña
                        </label>
                </div>
                <div className='col-auto'>
                  <Link href='/change-password'>
                    <a className='form-text small' href='#'>
                      ¿No recuerdas la contraseña?
                          </a>
                  </Link>
                </div>
              </div>
              <Field
                className={classnames(`form-control`, {
                  'is-invalid': touched.password && errors.password,
                })}
                name='password'
                id='loginPassword'
                placeholder='Contraseña'
                type='password'
              />
              {touched.password && errors.password && (
                <div className='invalid-feedback'>{errors.password}</div>
              )}
            </div>

            <button
              className='btn btn-lg btn-block btn-primary'
              type='submit'>
              Entrar
                  </button>
            <hr className='my-4' />
            <p className='text-center'>
              <small className='text-muted text-center'>
                ¿No tienes cuenta?
                      <Link href='/signup'>
                  <a> Regístrate </a>
                </Link>
              </small>
            </p>
          </Form>
        )}
      </Formik>
    </AuthLayout>


  );
}
