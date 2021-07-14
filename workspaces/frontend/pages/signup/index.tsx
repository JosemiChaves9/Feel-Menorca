import { useRouter } from 'next/router';
import { useState } from 'react';
import { Formik, Field, Form, FormikProps } from 'formik';
import * as Yup from 'yup';
import classnames from 'classnames';
import { useAuth } from '../../components/UserProvider/UserProvider';
import { AuthLayout } from 'components/AuthLayout/AuthLayout';

interface FormValues {
  email: string;
  phoneNumber: string;
  password: string;
  passwordConfirm: string;
}

const formikInitialValues = {
  email: '',
  password: '',
  phoneNumber: '',
  passwordConfirm: '',
};

const formikValidationSchema = Yup.object({
  email: Yup.string()
    .email('Se requiere un email valido')
    .required('Se requiere un email'),
  phoneNumber: Yup.number().required('Debes introducir un numero de telefono'),
  password: Yup.string()
    .min(6, 'La contraseña debe tener al menos 6 caracteres')
    .required('Se requiere una contraseña'),
  passwordConfirm: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Las contraseñas no coinciden')
    .required('Se requiere confirmar la contraseña'),
});

export default function SignUpScreen() {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState('');
  const { signup } = useAuth();

  const onClickOnSignUp = (
    providedEmail: string,
    providedPhoneNumber: string,
    providedPassword: string
  ) => {
    signup(providedEmail, providedPhoneNumber, providedPassword).then(
      (res) => {
        router.push('/');
      },
      (err) => {
        setErrorMessage(err);
      }
    );
  };

  return (
    <AuthLayout title="Regístrate">
      {errorMessage && (
        <div className='alert alert-danger' role='alert'>
          {errorMessage}
        </div>
      )}
      <Formik
        initialValues={formikInitialValues}
        validationSchema={formikValidationSchema}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          onClickOnSignUp(
            values.email,
            values.phoneNumber,
            values.password
          );
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
              />
              {touched.email && errors.email && (
                <div className='invalid-feedback'>{errors.email}</div>
              )}
            </div>
            <div className='form-group'>
              <label className='form-label' htmlFor='phoneNumber'>
                Numero de telefono
                    </label>
              <Field
                className={classnames(`form-control`, {
                  'is-invalid': touched.phoneNumber && errors.phoneNumber,
                })}
                name='phoneNumber'
                id='phoneNumber'
                type='tel'
              />
              {touched.phoneNumber && errors.phoneNumber && (
                <div className='invalid-feedback'>
                  {errors.phoneNumber}
                </div>
              )}
            </div>
            <div className='form-group'>
              <label className='form-label' htmlFor='loginPassword'>
                Contraseña
                    </label>
              <Field
                className={classnames(`form-control`, {
                  'is-invalid': touched.password && errors.password,
                })}
                name='password'
                id='loginPassword'
                type='password'
              />
              {touched.password && errors.password && (
                <div className='invalid-feedback'>{errors.password}</div>
              )}
            </div>
            <div className='form-group mb-4'>
              <label
                className='form-label'
                htmlFor='loginPasswordConfirm'>
                Confirma tu contraseña
                    </label>
              <Field
                className={classnames(`form-control`, {
                  'is-invalid':
                    touched.passwordConfirm && errors.passwordConfirm,
                })}
                name='passwordConfirm'
                id='loginPasswordConfirm'
                type='password'
              />
              {touched.passwordConfirm && errors.passwordConfirm && (
                <div className='invalid-feedback'>
                  {errors.passwordConfirm}
                </div>
              )}
            </div>
            <button className='btn btn-lg btn-block btn-primary'>
              Registrarme
                  </button>
          </Form>
        )}
      </Formik>
    </AuthLayout>
  );
}
