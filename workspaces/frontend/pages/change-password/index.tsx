import { Formik, Form, FormikProps, Field, FormikValues } from 'formik';
import * as Yup from 'yup';
import classnames from 'classnames';
import { useAuth } from '../../components/UserProvider/UserProvider';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { AuthLayout } from 'components/AuthLayout/AuthLayout';

const formikChangePasswordRequestValidationSchema = Yup.object({
  email: Yup.string()
    .email('Se requiere un email valido')
    .required('Se requiere un email'),
});

const formikInitialValues = {
  email: '',
};

export default function changePasswordRequestScreen() {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMesage] = useState(null);
  const { changePasswordRequest } = useAuth();

  const onClickOnSend = (emailProvided: string) => {
    changePasswordRequest(emailProvided).then(
      (res) => {
        setSuccessMesage(`Email enviado a ${emailProvided}`);
      },
      (err) => setErrorMessage(err.toString())
    );
  };

  return (
    <AuthLayout title="Recupera tu cuenta">
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
        validationSchema={formikChangePasswordRequestValidationSchema}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          onClickOnSend(values.email);
          resetForm();
          setSubmitting(false);
        }}>
        {({ touched, errors }: FormikProps<FormikValues>) => (
          <Form className='form-validate'>
            <div className='form-group'>
              <label className='form-label' htmlFor='loginUsername'>
                Introduce tu direccion email{' '}
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
            <button
              className='btn btn-lg btn-block btn-primary'
              type='submit'>
              Enviar
                    </button>
          </Form>
        )}
      </Formik>
    </AuthLayout>

  );
}
