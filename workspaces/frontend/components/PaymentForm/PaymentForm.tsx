import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import { faCreditCard } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useMutation } from '@apollo/client';
import { CREATE_RESERVATION } from '../../gql/ReservationMutations';
import moment from 'moment';
import { useRouter } from 'next/router';
import { Dispatch, SetStateAction, useState } from 'react';
import { TempReservation } from 'services/TempReservationService';

interface Props {
  hasUser: boolean;
  errorMessage: Dispatch<SetStateAction<string>>;
  tempReservation: TempReservation;
}

export const PaymentForm = ({
  hasUser,
  errorMessage,
  tempReservation,
}: Props) => {
  const stripe = useStripe();
  const elements = useElements();
  const [createReservation] = useMutation(CREATE_RESERVATION);
  const router = useRouter();
  const [isClickable, setIsClickable] = useState(true);

  const handleReservation = (
    timestamp: string,
    spotId: string,
    kayakReservations: { kayakType: string; duration: string }[],
    paymentId: string
  ) => {
    createReservation({
      variables: {
        timestamp,
        spotId,
        kayakReservations: kayakReservations.map((reservation) => ({
          kayakType: reservation.kayakType,
          duration: reservation.duration,
        })),
        paymentId,
      },
    }).then(
      (res) => {
        if (!!res.data.createReservation.error) {
          setIsClickable(true);
          return errorMessage(res.data.createReservation.error);
        }

        router.push(
          `reserve/confirm?reservationId=${res.data.createReservation.reservationID}`
        );
      },
      (err) => {
        errorMessage(err.toString());
        setIsClickable(true);
      }
    );
  };

  const handleOnClickOnConfirm = async (event) => {
    event.preventDefault();

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardNumberElement),
    });

    if (!error) {
      handleReservation(
        moment(tempReservation.date, 'YYYY-MM-DD').format('X'),
        tempReservation.spotId,
        tempReservation.kayaks,
        paymentMethod.id
      );
    } else setIsClickable(true);
  };

  return (
    <>
      <div className='text-block'>
        <form action='#'>
          <fieldset disabled={!hasUser}>
            <div className='d-flex justify-content-between align-items-end mb-4'>
              <h5 className='mb-0'>Pago con tarjeta de crédito</h5>
              <div className='text-muted'>
                <FontAwesomeIcon icon={faCreditCard}></FontAwesomeIcon>
              </div>
            </div>
            <div className='row' id='addNewCard'>
              <div className='form-group col-md-12'>
                <label className='form-label' htmlFor='card-number'>
                  Card number
                </label>
                <CardNumberElement
                  className='form-control pt-2'
                  options={{
                    showIcon: true,
                    classes: { invalid: 'is-invalid', complete: 'is-valid' },
                  }}
                />
              </div>
              <div className='form-group col-md-6'>
                <label className='form-label' htmlFor='expiry-date'>
                  Expiry Date
                </label>
                <CardExpiryElement
                  className='form-control pt-2'
                  options={{
                    classes: {
                      invalid: 'is-invalid',
                      complete: 'is-valid',
                    },
                  }}
                />
              </div>
              <div className='form-group col-md-6'>
                <label className='form-label' htmlFor='cvv'>
                  CVC/CVV
                </label>
                <CardCvcElement
                  className='form-control pt-2'
                  options={{
                    classes: { invalid: 'is-invalid', complete: 'is-valid' },
                  }}
                />
              </div>
            </div>
          </fieldset>
        </form>
      </div>
      <div className='text-block'>
        <h6>Política de cancelaciones</h6>
        <p className='text-sm text-muted'>
          Samsa was a travelling salesman - and above it there hung a picture
          that he had recently cut out of .
        </p>
      </div>
      <div className='row my-4 flex-column flex-sm-row'>
        <div className='col text-center text-sm-left'>
          <button
            className='btn btn-primary px-3'
            disabled={!isClickable}
            onClick={(e) => {
              setIsClickable(false);
              handleOnClickOnConfirm(e);
            }}>
            Confirmar reserva
          </button>
        </div>
        <div className='col text-center text-sm-right'>
          <a className='btn btn-link text-muted' onClick={() => router.back()}>
            Volver
          </a>
        </div>
      </div>
    </>
  );
};
