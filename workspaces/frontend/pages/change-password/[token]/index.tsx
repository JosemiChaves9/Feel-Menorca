import { Formik, Form, FormikProps, Field, FormikValues } from 'formik';
import * as Yup from 'yup';
import classnames from 'classnames';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useAuth } from 'components/UserProvider/UserProvider';
import { AuthLayout } from 'components/AuthLayout/AuthLayout';

const formikChangePasswordValidationSchema = Yup.object({
  password: Yup.string()
    .min(6, 'La contraseña debe tener al menos 6 caracteres')
    .required('Introduce una contraseña'),
  passwordConfirm: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Las contraseñas no coinciden')
    .required('Es necesario confirmar la contraseña'),
});

const formikInitialValues = {
  password: '',
  passwordConfirm: '',
};

export default function changePasswordScreen() {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const { changePassword } = useAuth();
  const { token } = router.query;

  const onClickOnSend = (newPassword: string) => {
    changePassword(newPassword, token as string).then(
      (res) => {
        setSuccessMessage('Contraseña cambiada con éxito');
      },
      (err) => {
        setErrorMessage(err.toString());
      }
    );
  };

  return (
    <AuthLayout title="Cambia tu contraseña">
      <div>
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
      </div>
      <Formik
        initialValues={formikInitialValues}
        validationSchema={formikChangePasswordValidationSchema}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          onClickOnSend(values.password);
          resetForm();
          setSubmitting(false);
        }}>
        {({ touched, errors }: FormikProps<FormikValues>) => (
          <Form className='form-validate'>
            <div className='form-group'>
              <label className='form-label' htmlFor='password'>
                Introduce tu nueva contraseña{' '}
              </label>
              <Field
                className={classnames(`form-control`, {
                  'is-invalid': touched.password && errors.password,
                })}
                name='password'
                id='password'
                type='password'
                placeholder='•••••••••••••'
              />
              {touched.password && errors.password && (
                <div className='invalid-feedback'>
                  {errors.password}
                </div>
              )}
            </div>
            <div className='form-group'>
              <label className='form-label' htmlFor='passwordConfirm'>
                Introduce tu nueva contraseña de nuevo{' '}
              </label>
              <Field
                className={classnames(`form-control`, {
                  'is-invalid':
                    touched.passwordConfirm && errors.passwordConfirm,
                })}
                name='passwordConfirm'
                id='passwordConfirm'
                type='password'
                placeholder='•••••••••••••'
              />
              {touched.passwordConfirm && errors.passwordConfirm && (
                <div className='invalid-feedback'>
                  {errors.passwordConfirm}
                </div>
              )}
            </div>
            <button
              className='btn btn-lg btn-block btn-primary'
              type='submit'>
              Cambiar
                    </button>
          </Form>
        )}
      </Formik>
    </AuthLayout>

  );
}
