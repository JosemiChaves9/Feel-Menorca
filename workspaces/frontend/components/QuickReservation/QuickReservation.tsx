import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { QuickReservationResult } from './QuickReservationResult';
import {
  filterKayakPricingInDate,
  filterKayakTypesWithPricingInDate,
  getKayaksTotalPrice,
} from '@mallorcabootcamp/bsr-utils';
import { SpotKayakType } from '../../gql';
import {
  ArrayHelpers,
  Field,
  FieldArray,
  Form,
  Formik,
  FormikErrors,
  FormikProps,
  FormikTouched,
} from 'formik';
import * as Yup from 'yup';
import classnames from 'classnames';
import { PersistFormikValues } from 'formik-persist-values';

interface FormState {
  kayaks: { kayakType: string; duration: string }[];
  date: string;
}

interface Props {
  kayakTypes: SpotKayakType[];
  onClickOnReserve: (result: QuickReservationResult) => void;
  dateProvided: string;
  enableSessionStoragePersist?: boolean;
  sessionStoragePersistKey?: string;
}

export const QuickReservation = ({
  enableSessionStoragePersist,
  sessionStoragePersistKey,
  kayakTypes,
  onClickOnReserve,
  dateProvided,
}: Props) => {
  const formikInitialValues = {
    kayaks: [
      {
        kayakType: '',
        duration: '',
      },
    ],
    date: dateProvided ? dateProvided : '',
  };

  const formikValidationSchema = Yup.object({
    date: Yup.date().required('Selecciona una fecha'),
    kayaks: Yup.array().of(
      Yup.object().shape({
        kayakType: Yup.string().required(`Selecciona un tipo de kayak`),
        duration: Yup.string().required(`Selecciona la duración`),
      })
    ),
  });

  const getKayakTypesInSelectedDate = (formState: FormState) =>
    kayakTypes.filter((kayakType) =>
      filterKayakTypesWithPricingInDate(kayakType, formState.date)
    );

  const renderKayakFields = (
    idx: number,
    values: FormState,
    touched: FormikTouched<FormState>,
    errors: FormikErrors<FormState>,
    arrayHelpers: ArrayHelpers
  ) => {
    return (
      <div>
        <div className='d-flex justify-content-between align-items-center mb-3'>
          <strong className='text-primary'>Kayak {idx + 1}</strong>
          {idx !== 0 && (
            <span
              className='text-danger d-flex justify-content-end'
              onClick={() => arrayHelpers.remove(idx)}>
              <FontAwesomeIcon icon={faTrashAlt}></FontAwesomeIcon>
            </span>
          )}
        </div>
        <div className='form-group'>
          <label className='form-label' htmlFor={`kayaks[${idx}].kayakType`}>
            Tipo de Kayak
          </label>

          <Field
            as='select'
            className={classnames(`form-control custom-select`, {
              'is-invalid':
                touched.kayaks && errors.kayaks
                  ? touched.kayaks[idx]?.kayakType &&
                    (errors.kayaks as FormikErrors<{ kayakType: string }>)[idx]
                      ?.kayakType
                  : false,
            })}
            name={`kayaks[${idx}].kayakType`}
            id={`kayaks[${idx}].kayakType`}>
            <option style={{ display: 'none' }} value={''}>
              Selecciona un tipo de kayak
            </option>
            {getKayakTypesInSelectedDate(values).map((kayakType) => (
              <option key={kayakType.name} value={kayakType.name}>
                {kayakType.description}
              </option>
            ))}
          </Field>
        </div>
        <div className='form-group'>
          <label className='form-label' htmlFor={`kayaks[${idx}].duration`}>
            Por cuánto tiempo
          </label>
          <Field
            as='select'
            className={classnames(`form-control custom-select`, {
              'is-invalid':
                touched.kayaks && errors.kayaks
                  ? touched.kayaks[idx]?.duration &&
                    (errors.kayaks as FormikErrors<{ duration: string }>)[idx]
                      ?.duration
                  : false,
            })}
            name={`kayaks[${idx}].duration`}
            id={`kayaks[${idx}].duration`}>
            <option style={{ display: 'none' }} value={''}>
              Selecciona una duración
            </option>
            {values.kayaks[idx].kayakType &&
              kayakTypes
                .find(
                  (kayakType) => kayakType.name === values.kayaks[idx].kayakType
                )
                .pricing.filter((pricingItem) =>
                  filterKayakPricingInDate(pricingItem, values.date)
                )
                .map((pricing) => (
                  <option
                    key={pricing.durationName}
                    value={pricing.durationName}>
                    {pricing.durationDescription}
                  </option>
                ))}
          </Field>
        </div>
      </div>
    );
  };

  return (
    <Formik
      initialValues={formikInitialValues}
      validationSchema={formikValidationSchema}
      onSubmit={(values, { setSubmitting }) => {
        onClickOnReserve({
          date: values.date,
          kayaks: values.kayaks,
        });
        setSubmitting(false);
      }}>
      {({ touched, errors, values, setValues }: FormikProps<FormState>) => {
        const kayakTypesInSelectedDate = getKayakTypesInSelectedDate(values);
        return (
          <Form className='form-validate'>
            <div className='p-4 shadow ml-lg-10 rounded sticky-top'>
              <h2 className='text-primary'>
                {getKayaksTotalPrice(values.kayaks, values.date, kayakTypes)}
              </h2>
              <hr className='my-4' />

              <label className='form-label' htmlFor='bookingDate'>
                Cuándo
              </label>
              <div className='datepicker-container datepicker-container-right mb-4'>
                <Field
                  className={classnames(`form-control`, {
                    'is-invalid': touched.date && errors.date,
                  })}
                  type='date'
                  name='date'
                  id='date'
                />
                {touched.date && errors.date && (
                  <div className='invalid-feedback'>{errors.date}</div>
                )}
              </div>
              {values.date && (
                <>
                  {!kayakTypesInSelectedDate.length ? (
                    <div className='alert alert-warning'>
                      No hay disponibilidad para la fecha seleccionada
                    </div>
                  ) : null}
                  {kayakTypesInSelectedDate.length ? (
                    <FieldArray
                      name='kayaks'
                      render={(arrayHelpers) =>
                        values.kayaks.map((value, idx) =>
                          renderKayakFields(
                            idx,
                            values,
                            touched,
                            errors,
                            arrayHelpers
                          )
                        )
                      }></FieldArray>
                  ) : null}
                  {kayakTypesInSelectedDate.length ? (
                    <div className='text-center'>
                      <p>
                        <a
                          className='text-secondary text-sm'
                          onClick={() => {
                            setValues((values) => ({
                              ...values,
                              kayaks: [
                                ...values.kayaks,
                                { kayakType: '', duration: '' },
                              ],
                            }));
                          }}>
                          Añade otro kayak
                        </a>
                      </p>
                    </div>
                  ) : null}
                </>
              )}
              <div className='form-group'>
                <button
                  disabled={!values.date}
                  type='submit'
                  className='btn btn-primary btn-block font-weight-bold'>
                  Reservar ahora
                </button>
              </div>
              <p className='text-muted text-sm text-center'>
                El precio incluye equipamiento
              </p>
            </div>
            {enableSessionStoragePersist && (
              <PersistFormikValues
                name={sessionStoragePersistKey}
                storage='sessionStorage'
                persistInvalid
              />
            )}
          </Form>
        );
      }}
    </Formik>
  );
};
